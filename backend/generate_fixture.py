import json
import re
from sqlglot import parse, exp

def generate_fixture_from_sql(sql_file_path):
    with open(sql_file_path, 'r') as f:
        lines = f.readlines()

    # Remove psql meta-commands and other non-standard SQL
    filtered_lines = []
    for line in lines:
        if not line.strip().startswith('\c'):
            filtered_lines.append(line)
    
    content = "".join(filtered_lines)
    content = re.sub(r'DROP DATABASE IF EXISTS .*', '', content)
    content = re.sub(r'CREATE DATABASE .*', '', content)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)


    fixtures = []
    # Parse the entire SQL file
    parsed = parse(content, read='postgres')

    for expression in parsed:
        if isinstance(expression, exp.Insert):
            table_name = expression.this.this.this
            
            #This is a generator of tuples, where each tuple represents a row of values
            rows_generator = expression.expression.expressions

            for row in rows_generator:
                pk_value = None
                fields = {}

                # Extracting columns from the insert statement
                columns = [col.this for col in expression.this.expressions]
                
                # Each `row` is an `exp.Tuple` containing `exp.Literal`s
                values = [literal.this for literal in row.expressions]

                for i, column_name in enumerate(columns):
                    if i == 0: # Assuming the first column is the primary key
                        pk_value = values[i]
                    else:
                        fields[column_name] = values[i]
                
                # Determine app_label and model_name
                app_label = 'analytics'  # Placeholder
                model_name = table_name.lower()

                fixture_entry = {
                    "model": f"{app_label}.{model_name}",
                    "pk": pk_value,
                    "fields": fields
                }
                fixtures.append(fixture_entry)

    return fixtures

if __name__ == "__main__":
    sql_file = 'backend/Chinook_PostgreSql.sql'
    output_file = 'backend/fixtures/chinook_fixture.json'

    fixture_data = generate_fixture_from_sql(sql_file)

    with open(output_file, 'w') as f:
        json.dump(fixture_data, f, indent=4)

    print(f"Fixture data generated in {output_file}")
