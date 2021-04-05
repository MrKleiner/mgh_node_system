# mgh_node_system
To make it work:
(Requires internet connection to work. For now)

   - Install python in any way you like. You should be able to call it from command line with "python" command.
   - Go to cgi-bin, edit "hello.py" and change the path in the first row to the python.exe on your PC. Important: Leave #! in the beginning of the path!
   - The way it saves the data is by writing the file containing all the data to the root dir (where index.html is). The data is encrypted
   - To specify the encryption password - create a file in the root dir with the following name: "personal_password.mghpas" and put a password inside.
   - Now simply launch "silent_launch.vbs". Warning: This will kill any task named "python.exe". Modify "mlauncher.cmd" if this is not a desired behaviour.
   - Go to your web browser of pesonal preference (works best with Chrome and Mozilla) and type this into the url field: localhost:8000
   - You can create a shortcut to silent_launch.vbs so you can launch it from desktop or taskbar.
   - Profit


