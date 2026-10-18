import sys
import json
import zipfile
import os

def incrementar_versao(versao_atual, tipo="minor"):
    partes = versao_atual.lstrip('v').split('.')
    major, minor, patch = map(int, partes)
    if tipo == "major":
        major += 1
        minor = 0
        patch = 0
    elif tipo == "minor":
        minor += 1
        patch = 0
    elif tipo == "patch":
        patch += 1
    return f"v{major}.{minor}.{patch}"

tipo_mudanca = sys.argv[1] if len(sys.argv) > 1 else "minor"

with open("package.json", "r", encoding="utf-8") as f:
    pkg = json.load(f)

nova_versao = incrementar_versao(pkg.get("version", "v3.8.0"), tipo_mudanca)
pkg["version"] = nova_versao

with open("package.json", "w", encoding="utf-8") as f:
    json.dump(pkg, f, indent=2, ensure_ascii=False)

folder_name = f"pedidos_{nova_versao}"
zip_filename = f"{folder_name}.zip"

arquivos_projeto = [
    "index.html", "style.css", "script.js", "server.js",
    "banco.sql", "config.json", "clientes.json", "produtos.json",
    "README.md", "Estrutura-pedido.md", "registro_mudancas.md",
    "package.json", "gerar_versao_zip.py"
]

with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zf:
    for arquivo in arquivos_projeto:
        if os.path.exists(arquivo):
            arcname = os.path.join(folder_name, arquivo)
            zf.write(arquivo, arcname)

print(f"Versao {nova_versao} gerada com sucesso! Arquivo ZIP: {zip_filename}")
