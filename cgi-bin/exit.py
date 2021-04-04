#!c:\custom\python\python_3_8_9\python.exe
import time
import cgi, cgitb
import os
import signal


print("ddddddddddddddass")

f = open("webserver.pid", "r")
webserverpid = f.read()
webserverpid_int = int(webserverpid)
f.close()
print(webserverpid)
# os.kill(int(webserverpid), signal.SIGTERM)
# print ("Content-type:text/plain\r\n\r\n")
# print("killme_no_later")
time.sleep(5)
try:
    os.kill(19204, signal.SIGTERM) # int(webserverpid)
    print(webserverpid + "try printed")
except OSError as e:
    print("os_super_error" + str(e))