import pymysql
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request
import logging

@app.route('/user')
def users():
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT * FROM user")
		rows = cursor.fetchall()
		resp = jsonify(rows)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/user/delete/<int:id>')
def delete_user(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor()
		cursor.execute("DELETE FROM user WHERE id=%s", (id,))
		conn.commit()
		resp = jsonify('User deleted successfully!')
		resp.status_code = 200
		return ''
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/user/<int:id>')
def user(id):
	try:
		conn = mysql.connect()
		cursor = conn.cursor(pymysql.cursors.DictCursor)
		cursor.execute("SELECT * FROM user WHERE id=%s", id)
		row = cursor.fetchone()
		resp = jsonify(row)
		resp.status_code = 200
		return resp
	except Exception as e:
		print(e)
	finally:
		cursor.close() 
		conn.close()

@app.route('/add', methods=['POST'])
def add_user():
    try:
        json = request.json
        name = json["name"]
        shot = json["shot"]
        gorge = json["gorge"]
        sql = "INSERT INTO user(name, shot, gorge) VALUES(%s, %s, %s)"
        data = (name, shot, gorge)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        resp = jsonify('User added successfully!')
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)

@app.route('/update', methods=['POST'])
def update_user():
    try:
        json = request.json
        id_user = json["id"]
        name = json["name"]
        shot = json["shot"]
        gorge = json["gorge"]
        sql = "UPDATE user SET name=%s, shot=%s, gorge=%s WHERE id=%s"
        data = (name, shot, gorge, id_user)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        resp = jsonify('User update successfully!')
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

if __name__ == "__main__":
    app.run(host = '0.0.0.0')