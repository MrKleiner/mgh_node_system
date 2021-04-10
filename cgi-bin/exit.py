import os
import signal

print("Content-type:text/plain\r\n\r\n")  #
print("killme_no_later")

try:
    print(f"{11344} + kill this pid!")
    os.kill(11344, signal.CTRL_BREAK_EVENT)

except OSError as e:
    print("os_super_error: " + str(e))
