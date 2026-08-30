from flask import Flask, render_template, jsonify, request 
import pandas as pd 
import os 
 
app = Flask(__name__) 
 
 
# ===================================================== 
# LOAD DATASET 
# ===================================================== 
 
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
DATA_FILE = os.path.join(BASE_DIR, "Car_data.csv") 
 
data = pd.read_csv(DATA_FILE) 
 
 
# ===================================================== 
# PREPARE DATA 
# ===================================================== 
 
data["Depreciation"] = ( 
    data["Present_Price"] - data["Selling_Price"] 
) 
 
data["Age"] = 2018 - data["Year"] 
 
 
# ===================================================== 
# GET UNIQUE CAR NAMES 
# ===================================================== 
 
def get_car_names(): 
 
    car_names = sorted( 
        data["Car_Name"] 
        .dropna() 
        .astype(str) 
        .unique() 
        .tolist() 
    ) 
 
    return car_names 
 
 
# ===================================================== 
# IDENTIFY BIKES AND CARS 
# ===================================================== 
 
bike_brands = ( 
    "Royal Enfield|Bajaj|TVS|Yamaha|Hero|Activa" 
) 
 
 
bikes = data[ 
    data["Car_Name"].str.contains( 
        bike_brands, 
        case=False, 
        na=False 
    ) 
].copy() 
 
 
cars = data[ 
    ~data["Car_Name"].str.contains( 
        bike_brands, 
        case=False, 
        na=False 
    ) 
].copy() 
 
 
# ===================================================== 
# GET ALL ANALYSIS RESULTS 
# ===================================================== 
 
def get_results(): 
 
    results = [] 
 
 
    # ================================================= 
    # 1 
    # ================================================= 
 
    results.append({ 
        "number": 1, 
        "question": "From which manufacturing year to which manufacturing year vehicles are present?", 
        "answer": ( 
            f"Vehicles are available from " 
            f"{data['Year'].min()} to " 
            f"{data['Year'].max()}." 
        ) 
    }) 
 
 
    # ================================================= 
    # 2 
    # ================================================= 
 
    results.append({ 
        "number": 2, 
        "question": "What is the lowest selling price?", 
        "answer": ( 
            f"{data['Selling_Price'].min()} Lakhs" 
        ) 
    }) 
 
 
    # ================================================= 
    # 3 
    # ================================================= 
 
    results.append({ 
        "number": 3, 
        "question": "What is the highest selling price?", 
        "answer": ( 
            f"{data['Selling_Price'].max()} Lakhs" 
        ) 
    }) 
 
 
    # ================================================= 
    # 4 
    # ================================================= 
 
    results.append({ 
        "number": 4, 
        "question": "How many records are present?", 
        "answer": ( 
            f"{data.shape[0]} records" 
        ) 
    }) 
 
 
    # ================================================= 
    # 5 
    # ================================================= 
 
    missing_values = int( 
        data.isnull().sum().sum() 
    ) 
 
    results.append({ 
        "number": 5, 
        "question": "Are there missing records?", 
        "answer": ( 
            f"Total missing values: {missing_values}" 
        ) 
    }) 
 
 
    # ================================================= 
    # 6 
    # ================================================= 
 
    results.append({ 
        "number": 6, 
        "question": "How many different vehicles are present?", 
        "answer": ( 
            f"{data['Car_Name'].nunique()} unique vehicles" 
        ) 
    }) 
 
 
    # ================================================= 
    # 7 
    # ================================================= 
 
    most_sold_vehicle = ( 
        data["Car_Name"] 
        .value_counts() 
        .idxmax() 
    ) 
 
    results.append({ 
        "number": 7, 
        "question": "Which is the most sold vehicle?", 
        "answer": most_sold_vehicle 
    }) 
 
 
    # ================================================= 
    # 8 
    # ================================================= 
 
    cng_count = len( 
        data[ 
            data["Fuel_Type"] == "CNG" 
        ] 
    ) 
 
    results.append({ 
        "number": 8, 
        "question": "How many CNG vehicles are present?", 
        "answer": ( 
            f"Total CNG vehicles: {cng_count}" 
        ) 
    }) 
 
 
    # ================================================= 
    # 9 
    # ================================================= 
 
    individual_count = len( 
        data[ 
            data["Seller_Type"] == "Individual" 
        ] 
    ) 
 
    results.append({ 
        "number": 9, 
        "question": "How many vehicles are sold by Individuals?", 
        "answer": ( 
            f"{individual_count} vehicles" 
        ) 
    }) 
 
 
    # ================================================= 
    # 10 
    # ================================================= 
 
    automatic_count = len( 
        data[ 
            data["Transmission"] == "Automatic" 
        ] 
    ) 
 
    results.append({ 
        "number": 10, 
        "question": "How many automatic vehicles are present?", 
        "answer": ( 
            f"{automatic_count} vehicles" 
        ) 
    }) 
 
 
    # ================================================= 
    # 11 
    # ================================================= 
 
    single_owner_count = len( 
        data[ 
            data["Owner"] == 0 
        ] 
    ) 
 
    results.append({ 
        "number": 11, 
        "question": "How many single-owner vehicles are present?", 
        "answer": ( 
            f"{single_owner_count} vehicles" 
        ) 
    }) 
 
 
    # ================================================= 
    # 12 
    # ================================================= 
 
    most_depreciated = data.loc[ 
        data["Depreciation"].idxmax() 
    ] 
 
    least_depreciated = data.loc[ 
        data["Depreciation"].idxmin() 
    ] 
 
    results.append({ 
        "number": 12, 
        "question": "Which vehicle has the most and least depreciation?", 
        "answer": ( 
            f"Most: {most_depreciated['Car_Name']} " 
            f"({most_depreciated['Depreciation']:.2f} Lakhs). " 
            f"Least: {least_depreciated['Car_Name']} " 
            f"({least_depreciated['Depreciation']:.2f} Lakhs)." 
        ) 
    }) 
 
 
    # ================================================= 
    # 13 
    # ================================================= 
 
    less_depreciated = ( 
        data.groupby("Car_Name")["Depreciation"] 
        .mean() 
        .sort_values() 
        .head(5) 
    ) 
 
    results.append({ 
        "number": 13, 
        "question": "Which vehicles are less affected by depreciation?", 
        "answer": ( 
            ", ".join( 
                less_depreciated.index.tolist() 
            ) 
        ) 
    }) 
 
 
    # ================================================= 
    # 14 
    # ================================================= 
 
    results.append({ 
        "number": 14, 
        "question": "What factors affect vehicle depreciation?", 
        "answer": ( 
            "Age, kilometers driven, fuel type, " 
            "transmission, ownership, seller type " 
            "and brand can affect depreciation." 
        ) 
    }) 
 
 
    # ================================================= 
    # 15 
    # ================================================= 
 
    age_correlation = ( 
        data[["Age", "Selling_Price"]] 
        .corr() 
        .iloc[0, 1] 
    ) 
 
    kms_correlation = ( 
        data[["Kms_Driven", "Selling_Price"]] 
        .corr() 
        .iloc[0, 1] 
    ) 
 
    results.append({ 
        "number": 15, 
        "question": "Is selling price affected by vehicle age and kilometers?", 
        "answer": ( 
            f"Age correlation: {age_correlation:.2f}, " 
            f"Kilometers correlation: {kms_correlation:.2f}. " 
            f"Generally, older and heavily driven vehicles " 
            f"have lower selling prices." 
        ) 
    }) 
 
 
    # ================================================= 
    # 16 
    # ================================================= 
 
    newest_count = len( 
        data[ 
            data["Year"] > 2014 
        ] 
    ) 
 
    results.append({ 
        "number": 16, 
        "question": "How many vehicles were manufactured after 2014?", 
        "answer": ( 
            f"{newest_count} vehicles" 
        ) 
    }) 
 
 
    # ================================================= 
    # 17 
    # ================================================= 
 
    results.append({ 
        "number": 17, 
        "question": "Can we find only two-wheelers?", 
        "answer": ( 
            f"Yes. {len(bikes)} two-wheelers found." 
        ) 
    }) 
 
 
    # ================================================= 
    # 18 
    # ================================================= 
 
    if len(bikes) > 0: 
 
        oldest_bike = bikes.loc[ 
            bikes["Year"].idxmin() 
        ] 
 
        answer_18 = ( 
            f"{oldest_bike['Car_Name']} - " 
            f"{oldest_bike['Year']}" 
        ) 
 
    else: 
 
        answer_18 = "No bike data found." 
 
 
    results.append({ 
        "number": 18, 
        "question": "Which is the oldest bike?", 
        "answer": answer_18 
    }) 
 
 
    # ================================================= 
    # 19 
    # ================================================= 
 
    if len(bikes) > 0: 
 
        newest_bike = bikes.loc[ 
            bikes["Year"].idxmax() 
        ] 
 
        answer_19 = ( 
            f"{newest_bike['Car_Name']} - " 
            f"{newest_bike['Year']}" 
        ) 
 
    else: 
 
        answer_19 = "No bike data found." 
 
 
    results.append({ 
        "number": 19, 
        "question": "Which is the newest bike?", 
        "answer": answer_19 
    }) 
 
 
    # ================================================= 
    # 20 
    # ================================================= 
 
    if len(bikes) > 0: 
 
        answer_20 = ( 
            bikes["Car_Name"] 
            .value_counts() 
            .idxmax() 
        ) 
 
    else: 
 
        answer_20 = "No bike data found." 
 
 
    results.append({ 
        "number": 20, 
        "question": "Which is the most sold bike?", 
        "answer": answer_20 
    }) 
 
 
    # ================================================= 
    # 21 
    # ================================================= 
 
    if len(bikes) > 0: 
 
        bikes_temp = bikes.copy() 
 
        bikes_temp["Value_Retention"] = ( 
            bikes_temp["Selling_Price"] 
            / bikes_temp["Present_Price"] 
        ) * 100 
 
        best_bike = bikes_temp.loc[ 
            bikes_temp["Value_Retention"].idxmax() 
        ] 
 
        answer_21 = ( 
            f"{best_bike['Car_Name']} has " 
            f"{best_bike['Value_Retention']:.2f}% " 
            f"value retention." 
        ) 
 
    else: 
 
        answer_21 = "No bike data found." 
 
 
    results.append({ 
        "number": 21, 
        "question": "Which bike deal exceeded general expectation?", 
        "answer": answer_21 
    }) 
 
 
    # ================================================= 
    # 22 
    # ================================================= 
 
    results.append({ 
        "number": 22, 
        "question": "Can we find only cars?", 
        "answer": ( 
            f"Yes. {len(cars)} cars found." 
        ) 
    }) 
 
 
    # ================================================= 
    # 23 
    # ================================================= 
 
    if len(cars) > 0: 
 
        oldest_car = cars.loc[ 
            cars["Year"].idxmin() 
        ] 
 
        answer_23 = ( 
            f"{oldest_car['Car_Name']} - " 
            f"{oldest_car['Year']}" 
        ) 
 
    else: 
 
        answer_23 = "No car data found." 
 
 
    results.append({ 
        "number": 23, 
        "question": "Which is the oldest car?", 
        "answer": answer_23 
    }) 
 
 
    # ================================================= 
    # 24 
    # ================================================= 
 
    if len(cars) > 0: 
 
        newest_car = cars.loc[ 
            cars["Year"].idxmax() 
        ] 
 
        answer_24 = ( 
            f"{newest_car['Car_Name']} - " 
            f"{newest_car['Year']}" 
        ) 
 
    else: 
 
        answer_24 = "No car data found." 
 
 
    results.append({ 
        "number": 24, 
        "question": "Which is the newest car?", 
        "answer": answer_24 
    }) 
 
 
    # ================================================= 
    # 25 
    # ================================================= 
 
    if len(cars) > 0: 
 
        cars_temp = cars.copy() 
 
        cars_temp["Value_Retention"] = ( 
            cars_temp["Selling_Price"] 
            / cars_temp["Present_Price"] 
        ) * 100 
 
        best_car = cars_temp.loc[ 
            cars_temp["Value_Retention"].idxmax() 
        ] 
 
        answer_25 = ( 
            f"{best_car['Car_Name']} retains " 
            f"{best_car['Value_Retention']:.2f}% " 
            f"of its present price." 
        ) 
 
    else: 
 
        answer_25 = "No car data found." 
 
 
    results.append({ 
        "number": 25, 
        "question": "Which car deal exceeded general expectation?", 
        "answer": answer_25 
    }) 
 
 
    return results 
 
 
# ===================================================== 
# HOME PAGE 
# ===================================================== 
 
@app.route("/") 
def home(): 
 
    return render_template( 
        "index.html", 
        results=get_results(), 
        vehicle_result=None, 
        car_names=get_car_names(), 
        error=None 
    ) 
 
 
# ===================================================== 
# ANALYZE VEHICLE 
# ===================================================== 
 
@app.route("/analyze", methods=["POST"]) 
def analyze_vehicle(): 
 
    car_name = request.form.get( 
        "car_name", 
        "" 
    ).strip() 
 
    year = request.form.get( 
        "year", 
        "" 
    ).strip() 
 
    selling_price = request.form.get( 
        "selling_price", 
        "" 
    ).strip() 
 
    present_price = request.form.get( 
        "present_price", 
        "" 
    ).strip() 
 
    kms_driven = request.form.get( 
        "kms_driven", 
        "" 
    ).strip() 
 
    fuel_type = request.form.get( 
        "fuel_type", 
        "" 
    ).strip() 
 
    seller_type = request.form.get( 
        "seller_type", 
        "" 
    ).strip() 
 
    transmission = request.form.get( 
        "transmission", 
        "" 
    ).strip() 
 
    owner = request.form.get( 
        "owner", 
        "" 
    ).strip() 
 
 
    # VALIDATION 
 
    if not all([ 
        car_name, 
        year, 
        selling_price, 
        present_price, 
        kms_driven, 
        fuel_type, 
        seller_type, 
        transmission, 
        owner 
    ]): 
 
        return render_template( 
            "index.html", 
            results=get_results(), 
            vehicle_result=None, 
            car_names=get_car_names(), 
            error="Please fill all the form fields." 
        ) 
 
 
    try: 
 
        year = int(year) 
 
        selling_price = float( 
            selling_price 
        ) 
 
        present_price = float( 
            present_price 
        ) 
 
        kms_driven = int( 
            kms_driven 
        ) 
 
        owner = int( 
            owner 
        ) 
 
 
    except ValueError: 
 
        return render_template( 
            "index.html", 
            results=get_results(), 
            vehicle_result=None, 
            car_names=get_car_names(), 
            error="Please enter valid numbers." 
        ) 
 
 
    # CALCULATIONS 
 
    age = 2018 - year 
 
    depreciation = ( 
        present_price - selling_price 
    ) 
 
 
    if present_price > 0: 
 
        value_retention = ( 
            selling_price / present_price 
        ) * 100 
 
    else: 
 
        value_retention = 0 
 
 
    vehicle_result = { 
 
        "car_name": car_name, 
 
        "year": year, 
 
        "selling_price": selling_price, 
 
        "present_price": present_price, 
 
        "kms_driven": kms_driven, 
 
        "fuel_type": fuel_type, 
 
        "seller_type": seller_type, 
 
        "transmission": transmission, 
 
        "owner": owner, 
 
        "age": age, 
 
        "depreciation": round( 
            depreciation, 
            2 
        ), 
 
        "value_retention": round( 
            value_retention, 
            2 
        ) 
    } 
 
 
    return render_template( 
        "index.html", 
        results=get_results(), 
        vehicle_result=vehicle_result, 
        car_names=get_car_names(), 
        error=None 
    ) 
 
 
# ===================================================== 
# API - ALL RESULTS 
# ===================================================== 
 
@app.route("/api/results") 
def api_results(): 
 
    return jsonify( 
        get_results() 
    ) 
 
 
# ===================================================== 
# API - MISSING VALUES 
# THIS FIXES YOUR ERROR 
# ===================================================== 
@app.route("/api/missing-values")
def missing_values_api():

    try:

        missing_values = (
            data.isnull()
            .sum()
        )

        columns = []

        for column_name, missing_count in missing_values.items():

            columns.append({

                "column": str(column_name),

                "missing": int(missing_count)

            })

        total_missing = int(
            missing_values.sum()
        )

        return jsonify({

            "success": True,

            "columns": columns,

            "total_missing": total_missing

        })

    except Exception as error:

        return jsonify({

            "success": False,

            "error": str(error),

            "columns": [],

            "total_missing": 0

        }), 500


# =====================================================
# DASHBOARD PAGE
# PASTE THE NEW DASHBOARD CODE HERE
# =====================================================

@app.route("/dashboard")
def dashboard():

    fuel_data = (
        data["Fuel_Type"]
        .value_counts()
    )

    transmission_data = (
        data["Transmission"]
        .value_counts()
    )

    year_data = (
        data["Year"]
        .value_counts()
        .sort_index()
    )

    top_vehicles = (
        data.groupby("Car_Name")["Selling_Price"]
        .mean()
        .sort_values(ascending=False)
        .head(10)
    )

    dashboard_data = {

        "fuel_labels":
            fuel_data.index.tolist(),

        "fuel_values":
            fuel_data.values.tolist(),


        "transmission_labels":
            transmission_data.index.tolist(),

        "transmission_values":
            transmission_data.values.tolist(),


        "year_labels":
            year_data.index.astype(str).tolist(),

        "year_values":
            year_data.values.tolist(),


        "top_vehicle_labels":
            top_vehicles.index.tolist(),

        "top_vehicle_values":
            [
                round(float(value), 2)
                for value in top_vehicles.values.tolist()
            ]

    }


    return render_template(

        "dashboard.html",

        dashboard_data=dashboard_data,

        total_records=int(
            data.shape[0]
        ),

        unique_vehicles=int(
            data["Car_Name"].nunique()
        ),

        automatic_count=int(
            len(
                data[
                    data["Transmission"]
                    == "Automatic"
                ]
            )
        ),

        cng_count=int(
            len(
                data[
                    data["Fuel_Type"]
                    == "CNG"
                ]
            )
        )

    )


# =====================================================
# RUN APPLICATION
# =====================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )
