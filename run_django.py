#!/usr/bin/env python3
import os
import subprocess
import sys

def main():
    """
    Run the Django development server with proper configuration.
    This script automates several steps:
    1. Set up environment variables
    2. Migrate the database (create it if it doesn't exist)
    3. Load fixtures data
    4. Start the development server
    """
    # Project directory
    django_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'django_project')
    
    # Change to the Django project directory
    os.chdir(django_dir)
    
    # Check if database exists, if not create it and load data
    if not os.path.exists(os.path.join(django_dir, 'db.sqlite3')):
        print("Setting up database for the first time...")
        
        # Run migrations
        subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
        
        # Load fixtures
        subprocess.run([sys.executable, 'manage.py', 'loaddata', 'initial_data'], check=True)
        
        print("Database setup complete!")
    else:
        # If DB exists, just make sure migrations are up to date
        subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
    
    # Create a superuser for admin access if needed
    try:
        from django.contrib.auth.models import User
        from django.db.utils import OperationalError
        
        # Use Django's management commands programmatically
        import django
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'arabic_stories.settings')
        django.setup()
        
        # Check if superuser exists
        try:
            if not User.objects.filter(is_superuser=True).exists():
                print("Creating admin superuser...")
                User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
                print("Superuser created! Username: admin, Password: admin123")
        except OperationalError:
            print("Could not check for superuser - database may not be ready.")
    except Exception as e:
        print(f"Error checking/creating superuser: {e}")
    
    # Start the development server
    print("Starting development server...")
    server_command = [sys.executable, 'manage.py', 'runserver', '0.0.0.0:8000']
    subprocess.run(server_command)

if __name__ == '__main__':
    main()