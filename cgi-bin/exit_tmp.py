import os
import signal

print("Content-type:text/plain\r\n\r\n")  #
print("killme_no_later")

try:
    print(str(xxxxx) + " kill this pid!")
    os.kill(xxxxx, signal.CTRL_BREAK_EVENT)

except OSError as e:
    print("os_super_error: " + str(e))
