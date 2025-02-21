import os

def collect_files(root_dir, output_file="output_files.txt", exclude_dirs=None, extensions=None):
    """
    Sucht in root_dir (rekursiv) nach Dateien mit den angegebenen Erweiterungen und schreibt die Ergebnisse in output_file
    im folgenden Format:

    Datei: Dateiname
    Pfad: relativer/pfad/zum/Dateiname
    Inhalt:
    <Inhalt der Datei>

    =======

    :param root_dir: Das Wurzelverzeichnis, das durchsucht werden soll.
    :param output_file: Der Name der Ausgabedatei.
    :param exclude_dirs: Eine Liste von Ordnernamen, die nicht durchsucht werden sollen.
    :param extensions: Eine Liste von Dateiendungen, nach denen gesucht werden soll (z. B. ['.css', '.js', '.html']).
    """

    if exclude_dirs is None:
        exclude_dirs = []

    if extensions is None:
        extensions = ['.css', '.js', '.html']

    # Pfad für das Output-File
    script_dir = os.path.abspath(os.path.dirname(__file__))  # Das Verzeichnis, in dem das Skript liegt
    output_path = os.path.join(script_dir, output_file)

    # Für konsistente Ausgabe: erst leeren oder neu erstellen
    with open(output_path, "w", encoding="utf-8") as f_out:
        # Noch kein Inhalt schreiben, nur Datei leeren/anlegen.
        pass

    # Rekursiv durch root_dir laufen
    for folderpath, dirs, files in os.walk(root_dir):
        # Entferne Ordner, die in exclude_dirs enthalten sind
        dirs[:] = [d for d in dirs if d not in exclude_dirs]

        for file in files:
            # Überprüfen, ob die Datei eine der gesuchten Erweiterungen hat
            if any(file.endswith(ext) for ext in extensions):
                # Absoluter Pfad zum gefundenen File
                abs_path = os.path.join(folderpath, file)

                # Relativer Pfad (z. B. relativ zum Skript)
                rel_path = os.path.relpath(abs_path, script_dir)

                # Dateiinhalt lesen
                with open(abs_path, "r", encoding="utf-8") as f:
                    content = f.read()

                # In output_file.txt anhängen
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

    # Erweiterungen, nach denen gesucht werden soll
    extensions = ['.css', '.js', '.html']

    # Ruf die Funktion auf
    collect_files(root_dir=script_dir, output_file="output_files.txt", exclude_dirs=exclude_dirs, extensions=extensions)
S