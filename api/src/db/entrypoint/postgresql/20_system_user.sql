CREATE USER eflushusr WITH PASSWORD 'eflushpassword';

GRANT USAGE ON SCHEMA EFLUSH_APP TO eflushusr;

GRANT ALL ON SCHEMA EFLUSH_APP TO eflushusr;
