#!c:\custom\python\python_3_8_9\python.exe
import cgi, cgitb
import os, sys, json

data = sys.stdin.read()
# cgitb.enable()

# form = cgi.FieldStorage()
# domrip=form.getvalue('domrip')
# data = sys.stdin.read(int(os.environ.get('HTTP_CONTENT_LENGTH', 0)))
print("Content-type:text/plain\r\n\r\n")
if data and len(data) > 1:
    with open("personal_password.mghpas", "w") as f:
        f.write(data)
    print("saved_succesfully")
else:
    print("db_save_error_too_bad")