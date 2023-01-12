from flask import Flask, request
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline, AutoModelForSeq2SeqLM, AutoModelWithLMHead
import os

app = Flask(__name__)

def modelInit():
    model_name = "deepset/roberta-base-squad2"
    return pipeline('question-answering', model=model_name, tokenizer=model_name)

@app.route("/")
def hello():
    return "<p>Hello, World!</p>"

@app.route("/run",  methods=['GET', 'POST'])
def run_model():
    if request.method == 'POST':
        return "Answer is this"
        try:
            question = request.args.get('question')
            unit = int(request.args.get('unit'))

            if (question is '' or question is None):
                app.aborter(400) 
        except Exception:
            app.aborter(400)

        nlp = modelInit()
        # QA_input = {
        #                 'question': question,
        #                 'context': context
        #             }
        # resq = nlp(QA_input)
        context = ''
        # Set context
        if unit == 1:
            context = open(os.getcwd() + '/unit1.txt',mode='r',encoding="utf8")
        elif unit == 2:
            context = open(os.getcwd() + '/unit2.txt',mode='r',encoding="utf8")
        elif unit == 3:
            context = open(os.getcwd() + '/unit3.txt',mode='r',encoding="utf8")
        elif unit == 4:
            context = open(os.getcwd() + '/unit4.txt',mode='r',encoding="utf8")
        elif unit == 5:
            context = open(os.getcwd() + '/unit5.txt',mode='r',encoding="utf8")
        else:
            app.aborter(400)
        
        # try:
        context = context.read()
        QA_input = {
                        'question': question,
                        'context': context
        }
        resq = nlp(QA_input)
        return resq
        # except Exception:
            # app.aborter(500)
    else:
        app.aborter(405)