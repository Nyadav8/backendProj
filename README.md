1ST: npm install
2ND: To run : nodemon server.js (PORT:8080)


DB POSTGRE SCRIPT:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,             
    first_name VARCHAR(50) NOT NULL,   
    last_name VARCHAR(50) NOT NULL,   
    email VARCHAR(100) UNIQUE,         
    password VARCHAR(25) NOT NULL,
	designation VARCHAR(30) NOT NULL,  -- value = 'CEO/CFO'
	status VARCHAR(20) NOT NULL,       -- value = ACTIVE/INACTIVE
	create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email_password ON users(email, password);

CREATE TABLE project (
	id SERIAL PRIMARY KEY, 
	project_name VARCHAR(100) NOT NULL UNIQUE,
	project_description VARCHAR(1000), 
	budget DECIMAL(15, 2) NOT NULL CHECK (budget > 0),
	planner_id INT, 
	coplanner_id INT,
	status VARCHAR(20) NOT NULL,       -- value = ACTIVE/INACTIVE
	create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_planner FOREIGN KEY (planner_id) REFERENCES users(id),
	CONSTRAINT fk_co_planner FOREIGN KEY (coplanner_id) REFERENCES users(id)
);
	
CREATE TABLE project_workforce_mapping (
	id SERIAL PRIMARY KEY,
	project_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	designation VARCHAR(30) NOT NULL,
	department VARCHAR(30) NOT NULL,
	budget DECIMAL(15, 2) NOT NULL CHECK (budget > 0),
	location VARCHAR(30) NOT NULL,
	status VARCHAR(20) NOT NULL,       -- value = ACTIVE/INACTIVE
	create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES project(id)
);
