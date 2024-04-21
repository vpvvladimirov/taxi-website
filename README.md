# Подготовка на технологиите:
  1. Изтеглете [Node.js](https://nodejs.org/en/download). Той ви трябва, за да може да стартирате React частта от проекта.
  2. Изтеглете [XAMPP](https://www.apachefriends.org/download.html). Той ще ви трябва, за да може да стартирате сървъра за базата данни и за PHP.
  3. Ако нямате изтеглена среда за разработка, изтеглете [Visual Studio Code](https://code.visualstudio.com/download) или някоя друга среда за разработка по ваш избор.

# Копиране на проекта:
  1. Копирайте папката taxi-website-project, навигирайте до xampp/htdocs и я поставете в "htdocs" папката. Необходимо е проектът да бъде там, за да може сървърната му част да работи.
  2. Копирайте файла "taxi_website_db.sql" и го поставете в папката bin, която се намира в "mysql" папката. В последстиве ще използвате този файл, за да импортирате базата данни.

# Създаване на базата данни:
  1. Отворете XAMPP Control Panel и стартирайте сървърите Apache и MySQL.
  2. Отворете своя браузър и напишете този линк в търсачката: http://localhost/phpmyadmin/. Това ще ви отведе до страницата phpMyAdmin, където ще можете да управлявате своята база данни.
  3. Създайте нова база данни и я кръстете "taxi_website_db".
  4. Отидете на Import и навигирайте до файла "taxi_website_db.sql", когото копирахте преди малко.
  5. Отворете новосъздадената база данни, за да се уверите, че процесът е бил успешен.

# Стартиране на проекта:
  1. Отворете папката "taxi-website-project" във Visual Studio Code.
  2. Отворете терминала и навигирайте до папката "taxi-website-react" със следната команда: `cd taxi-website-react`. Това е front-end частта на проекта.
  3. Напишете `npm install`, за да инсталирате всички необходими зависимости на проекта.
  4. Напишете `npm start`, за да стартирате проекта. Той би трябвало да се отвори автоматично в браузъра. Ако не, напишете http://localhost:3000/ и проектът ще се отвори.
  5. Ако не сте, стартирайте сървърите Apache и MySQL, като отворите XAMPP Control Panel.
  6. Проектът вече върви локално на устройството.


# Setting up the Technologies:
  1. Download [Node.js](https://nodejs.org/en/download). You will need it to run the React part of the project.
  2. Download [XAMPP](https://www.apachefriends.org/download.html). You will need it to run the database server and PHP.
  3. If you don't have a development environment installed, download [Visual Studio Code](https://code.visualstudio.com/download) or any other development environment of your choice.

# Copying the Project:
  1. Copy the folder "taxi-website-project" and navigate to xampp/htdocs, then paste it into the "htdocs" folder. It's necessary for the project to be there to run its server-side part.
  2. Copy the file "taxi_website_db.sql" and place it in the "bin" folder located within the "mysql" folder. Later on, you will use this file to import the database.

# Creating the Database:
  1. Open the XAMPP Control Panel and start the Apache and MySQL servers.
  2. Open your browser and type this link into the address bar: http://localhost/phpmyadmin/. This will take you to the phpMyAdmin page where you can manage your database.
  3. Create a new database and name it "taxi_website_db".
  4. Go to Import and navigate to the "taxi_website_db.sql" file you copied earlier.
  5. Open the newly created database to ensure the process was successful.

# Running the Project:
  1. Open the "taxi-website-project" folder in Visual Studio Code.
  2. Open the terminal and navigate to the "taxi-website-react" folder with this command `cd taxi-website-react`. This is the front-end part of the project.
  3. Run `npm install` to install all the necessary project dependencies.
  4. Run `npm start` to start the project. It should automatically open in your browser. If not, type http://localhost:3000/ and the project will open.
  5. If you haven't already, start the Apache and MySQL servers by opening the XAMPP Control Panel.
  6. The project is now running locally on your device.