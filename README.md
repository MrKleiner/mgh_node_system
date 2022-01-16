# mgh_node_system
(Does not require internet connection)
To make it work:


   - Install python in any way you like. You should be able to call it from command line with "python" command.
   - If on Linux - go to cgi-bin, edit "hello.py", "exit.py" and "pswd_change.py" and change the path in the first row to the python executable on your PC. Important: Leave #! in the beginning of the path!
   - The way it saves the data is by writing the file containing all the data to the root dir (where index.html is). The data is encrypted
   - To specify the encryption password - create a file in the root dir with the following name: "personal_password.mghpas" and put a password inside.
   - Now simply launch "silent_launch.vbs". Warning: This will kill any task named "python.exe". Modify "mlauncher.cmd" if this is not a desired behaviour.
      - If on Linux - ignore .vbs and .cmd shit. Make sure there's a !# with the path to the python executable in the first line of the file and execute the .py file.
   - Go to your web browser of personal preference (works best with Chrome and Mozilla) and type this into the url field: localhost:8000
   - You can create a shortcut to silent_launch.vbs so you can launch it from desktop or taskbar.
   - Profit



P.S.
Disable any javascript-blocking bs you have installed, since this whole system works purely on js.

