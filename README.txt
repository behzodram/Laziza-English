# Bu Laziza-Milliy ning v 1.0.2 versiyasidan nusxa olindi va PythonAnywherega nusxalandi

====================================================
yangi qarash
=============================
instruction:
    venv ga kirish.
    Agar python-dotenv requirements ichida bo'lmasa, alohida o'rnating:

    pip install python-dotenv

    Keyin tekshiring:

    pip show python-dotenv

CMD 1 - terminalda:
    cd Backend
    uvicorn app:app --host 0.0.0.0 --port 8000
    (bu komanda agentni o'zi ishga tushuradi.
    uv run python src/agent.py dev
    ni terminalda ishga tushurilmaydi.)

CMD 2 - terminalda
    cd ~/Desktop/EC2
    OpenClow AWS ga ko'chiladi    
    
    gunicorn --bind 0.0.0.0:5000 app:app
    API larni AI tool sifatida foydalanishi u-n

    Public IP:
    16.171.31.78:5000

Browser 2 - Chromeda
    app.js dan Backend url sozlanadi va index.html ochiladi

====================================================
eski qarash
=============================

CMD:
lokal test
uv run python src/agent.py console

global test
uv run python src/agent.py dev

sudo lsof -i :8000