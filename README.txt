# Bu Laziza-Milliy ning v 1.0.2 versiyasidan nusxa olindi va PythonAnywherega nusxalandi

====================================================
yangi qarash
=============================

CMD 1 - terminalda:
    cd Backend
    uvicorn app:app --reload
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

====================================================
eski qarash
=============================

CMD:
lokal test
uv run python src/agent.py console

global test
uv run python src/agent.py dev