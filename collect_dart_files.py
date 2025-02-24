import os

def collect_files(root_dir, output_file="output_files.txt", exclude_dirs=None):
    """
    Searches recursively in root_dir for:
      - HTML files (all files with a .html extension)
      - CSS files named "style.css"
      - JS files named "script.js"
    
    The results are written to output_file in the following format:
    
    Datei: Dateiname
    Pfad: relativer/pfad/zum/Dateiname
    Inhalt:
    <Inhalt der Datei>
    
    =======
    
    :param root_dir: Das Wurzelverzeichnis, das durchsucht werden soll.
    :param output_file: Der Name der Ausgabedatei.
    :param exclude_dirs: Eine Liste von Ordnernamen, die nicht durchsucht werden sollen.
    """
    
    if exclude_dirs is None:
        exclude_dirs = []
    
    # Pfad für das Output-File
    script_dir = os.path.abspath(os.path.dirname(__file__))  # Das Verzeichnis, in dem das Skript liegt
    output_path = os.path.join(script_dir, output_file)
    
    # Datei leeren oder neu erstellen
    with open(output_path, "w", encoding="utf-8") as f_out:
        pass

    # Rekursiv durch root_dir laufen
    for folderpath, dirs, files in os.walk(root_dir):
        # Ordner entfernen, die in exclude_dirs enthalten sind
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        for file in files:
            file_lower = file.lower()
            # HTML: alle .html-Dateien
            # CSS: nur style.css
            # JS: nur script.js
            if file.endswith('.html') or file_lower == 'style.css' or file_lower == 'script.js':
                abs_path = os.path.join(folderpath, file)
                rel_path = os.path.relpath(abs_path, script_dir)
                try:
                    with open(abs_path, "r", encoding="utf-8") as f:
                        content = f.read()
                except Exception as e:
                    content = f"Error reading file: {e}"
                with open(output_path, "a", encoding="utf-8") as f_out:
                    f_out.write(f"Datei: {file}\n")
                    f_out.write(f"Pfad: {rel_path}\n")
                    f_out.write("Inhalt:\n")
                    f_out.write(content)
                    f_out.write("\n=======\n\n")

    print(f"Fertig! Ergebnisse in: {output_path}")

if __name__ == "__main__":
    # Das Verzeichnis des Skripts verwenden
    script_dir = os.path.abspath(os.path.dirname(__file__))
    print(f"Durchsuche Verzeichnis: {script_dir}")

    # Liste von Ordnern, die nicht durchsucht werden sollen
    exclude_dirs = ["venv", ".git", "node_modules"]

    # Die Funktion aufrufen
    collect_files(root_dir=script_dir, output_file="output_files.txt", exclude_dirs=exclude_dirs)
