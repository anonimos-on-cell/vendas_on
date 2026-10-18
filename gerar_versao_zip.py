import zipfile
import os

zip_name = "pedidos_v3.14.0.zip"
folder = "pedidos_v3.14.0"

with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(folder):
        for file in files:
            full_path = os.path.join(root, file)
            zf.write(full_path, full_path)

print(f"Pacote {zip_name} gerado com sucesso!")
