import subprocess
import os
from datetime import datetime


def backup_postgresql_db(service_name, db_name, db_user, db_password, backup_dir='./postgres_data_backups'):
    # Ensure backup directory exists on the host
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)

    # Generate backup file name
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    backup_file = f"{db_name}_backup_{timestamp}.sql"
    container_backup_path = f"/var/lib/postgresql/backups/{backup_file}"
    host_backup_path = os.path.join(backup_dir, backup_file)

    # Create backup directory inside the container if it doesn't exist
    # create_dir_cmd = [
    #     'docker-compose', 'exec', '-T', service_name,
    #     'sh', '-c', 'mkdir -p /var/lib/postgresql/backups'
    # ]

    try:
        # # Ensure the backup directory exists inside the container
        # subprocess.run(create_dir_cmd, check=True)

        # Prepare the pg_dump command to be run inside the container
        dump_cmd = [
            'docker-compose', 'exec', '-T', service_name,
            'sh', '-c',
            f"PGPASSWORD={db_password} pg_dump -U {db_user} -d {db_name} > {container_backup_path}"
        ]

        # Execute the pg_dump command inside the Docker container
        subprocess.run(dump_cmd, check=True)
        print(f"Backup successful: {host_backup_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred while taking backup: {e}")


if __name__ == "__main__":
    # Database connection details
    SERVICE_NAME = 'postgres'
    DB_NAME = 'postgres'
    DB_USER = 'postgres'
    DB_PASSWORD = 'postgres'
    BACKUP_DIR = './postgres_data_backups'  # Directory to save backups on the host

    # Run the backup function
    backup_postgresql_db(SERVICE_NAME, DB_NAME, DB_USER, DB_PASSWORD, BACKUP_DIR)
