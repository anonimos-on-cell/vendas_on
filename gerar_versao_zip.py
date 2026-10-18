import zipfile, os
with zipfile.ZipFile('pedidos_v3.12.0.zip', 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file != 'pedidos_v3.12.0.zip' and not file.endswith('.pyc'):
                zf.write(os.path.join(root, file))
print("ZIP gerado com sucesso.")
