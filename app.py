"""Flask app for Cupcakes"""

from flask import Flask, request, jsonify, render_template
from models import db, connect_db, Cupcake, DEFAULT_IMG_URL


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)


@app.get("/api/cupcakes")
def list_all_cupcakes():
    """Return JSON {cupcakes: [{id, flavor, size, rating, image}, ...]}"""

    cupcakes = Cupcake.query.all()
    serialized = [cupcake.serialize() for cupcake in cupcakes]

    return jsonify(cupcakes=serialized)


@app.get("/api/cupcakes/<int:cupcake_id>")
def list_single_cupcake(cupcake_id):
    """Return JSON {cupcakes: {id, flavor, size, rating, image}}"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)


@app.post("/api/cupcakes")
def add_new_cupcake():
    """Add new cupcake to data from add form

    Return JSON {cupcakes: {id, flavor, size, rating, image}}
    """

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"]
    if image == "":
        image = DEFAULT_IMG_URL

    cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(cupcake)
    db.session.commit()

    serialized = cupcake.serialize()

    return (jsonify(cupcake=serialized), 201)


@app.patch("/api/cupcakes/<int:cupcake_id>")
def update_cupcake(cupcake_id):
    """Update existing cupcake.
    Return JSON: {cupcake: {id, flavor, size, rating, image}} """

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    if 'flavor' in request.json:
        cupcake.flavor = request.json["flavor"]
    if 'size' in request.json:
        cupcake.size = request.json["size"]
    if 'rating' in request.json:
        cupcake.rating = request.json["rating"]
    if 'image' in request.json:
        cupcake.image = request.json["image"] or DEFAULT_IMG_URL

    db.session.commit()

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)


@app.delete("/api/cupcakes/<int:cupcake_id>")
def delete_cupcake(cupcake_id):
    """Delete specified cupcake.
    Return JSON: {deleted: [cupcake-id]}"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.query.filter_by(id=cupcake_id).delete()
    db.session.commit()

    response = {'deleted': cupcake_id}

    return jsonify(response)

@app.get("/")
def generate_cupcakes_list():
    """Renders HTML to returns cupcakes list and add form"""

    return render_template("base.html")