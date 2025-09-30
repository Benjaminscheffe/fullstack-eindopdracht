# Installatiehandleiding MuziekMarktplaats

## Inhoudsopgave
1. Inleiding  
2. Benodigdheden  
3. Projectstructuur  
4. Gebruikte technieken & frameworks  
5. Installatie en configuratie  
6. Project lokaal draaien  
7. Testen  
8. Gebruikers en autorisatie  

---

## 1. Inleiding
Dit project bestaat uit een **web-API (backend)** en een **frontend** die samen de applicatie *MuziekMarktplaats* vormen.  

Doel:
Het platform biedt gebruikers de mogelijkheid om BEATS te bekijken en als gebruikers BEATS te plaatsen en aan een order te plaatsen.Bij het plaatsen van een beat kan er naast het kiezen van een muziek bestand ook een afbeelding gekozen worden. Bij aangekochte BEATS kan een review geplaatst worden.

Belangrijkste functionaliteiten:
- Gebruikersregistratie en inloggen (authenticatie en autorisatie).  
- CRUD-functionaliteit voor Beats (aanmaken, bekijken, aanpassen, verwijderen).  
- Ondersteuning voor bestands- en afbeeldingsuploads.  
- Rolgebaseerde toegang (bijvoorbeeld Admin en Gebruiker).  

---

## 2. Benodigdheden
Om de applicatie lokaal te draaien heb je nodig:  

- Java 21 (voor backend/Laatste long term versie)  
- Spring Boot 3.5.3 (Framework voor Java)
- Maven 3.8 (voor dependency management)  
- Node.js 18+ en npm (voor frontend)  
- Git (voor versiebeheer en klonen van de repositories)  
- IDE (optioneel, maar aanbevolen: IntelliJ IDEA, VS Code)  
- Postman (voor testen van API endpoints)  
- H2 database (meegeleverd in Spring Boot, geen extra installatie nodig)  

---

## 3. Projectstructuur
De applicatie bestaat uit twee repositories:  

### Backend – `fullstack-eindopdracht-backend`
```
fullstack-eindopdracht-backend/
│── src/
│   ├── main/java/...   # Java code (controllers, services, models)
│   ├── main/resources/ # application.properties, static resources
│── pom.xml             # Maven configuratie
│── file_uploads/       # Upload map voor bestanden
│── image_uploads/      # Upload map voor afbeeldingen
```

### Frontend – `fullstack-eindopdracht`
```
fullstack-eindopdracht/
│── public/             # Statische bestanden
│── src/                # React code (components, pages, services)
│── package.json        # Node.js configuratie
│── vite.config.js      # Vite configuratie
```

---

## 4. Gebruikte technieken & frameworks
- **Backend**:  
  - Spring Boot (REST API, security, data access)  
  - Maven (build tool & dependency management)  
  - H2 database (in-memory database voor ontwikkeling)  

- **Frontend**:  
  - React (component-based UI)  
  - Vite (snelle build tool)  
  - Axios (API-communicatie)  
  - SCSS (styling)  

---

## 5. Installatie en configuratie

### Stap 1: Repositories klonen
```bash
# Backend
git clone https://github.com/Benjaminscheffe/fullstack-eindopdracht-backend.git
cd fullstack-eindopdracht-backend

# Frontend
git clone https://github.com/Benjaminscheffe/fullstack-eindopdracht.git
cd fullstack-eindopdracht
```

### Stap 2: Backend configureren
In `src/main/resources/application.properties` staan de basisinstellingen.  
Voorbeeld:
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update

# PostGreSQL server aanmaken en instellen
spring.sql.init.platform=postgres
spring.datasource.url=jdbc:postgresql://localhost:5432/**DB-NAAM-INVOEREN**
spring.datasource.username=**GEBRUIKERSNAAM-INVOEREN**
spring.datasource.password=**GEKOZEN-WACTHWOORD-INVOEREN**

# Upload mappen
file.upload-dir=./file_uploads
image.upload-dir=./image_uploads

```

### Stap 3: Frontend configureren
Maak een `.env` bestand aan in de frontend root:
```env
VITE_API_URL=http://localhost:8080/api
```

---

## 6. Project lokaal draaien

### Backend starten
```bash
cd fullstack-eindopdracht-backend
mvn clean install
mvn spring-boot:run
```
De API draait standaard op:  
👉 `http://localhost:8080`

### Voorbeeld output terminal
```
 .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::               (v3.x)
```

### Frontend starten
```bash
cd fullstack-eindopdracht
npm install
npm run dev
```
De frontend draait standaard op:  
👉 `http://localhost:5173`

### Voorbeeld output terminal
```
  VITE v4.x  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

---

## 7. Testen

### Backend testen
Spring Boot tests draaien met Maven:
```bash
mvn test
```

### Voorbeeld output terminal
```
-------------------------------------------------------
 T E S T S
-------------------------------------------------------
Running com.example.demo.ServiceTests
Tests run: 5, Failures: 0, Errors: 0, Skipped: 0

BUILD SUCCESS
```

Je kunt ook API endpoints testen met Postman, zie bijgevoegde postman.json file.

### Voorbeeld Postman-call
- Endpoint: `POST http://localhost:8080/api/auth/login`  
- **Body (JSON):**
```json
{
  "username": "testuser",
  "password": "password"
}
```

### Frontend testen
Als er Jest/React Testing Library is ingesteld:
```bash
npm test
```

---

## 8. Gebruikers en autorisatie
De applicatie kent meerdere rollen:  
- Admin: kan alle data beheren, inclusief gebruikers.  
- User: kan BEATS aanmaken, order plaatsen en bij geplaatste orders een review plaatsen.  

👉 Standaard testgebruikers en wachtwoorden zijn vaak ingesteld in de `data.sql` of via `CommandLineRunner` in de backend. Controleer dit in de code (bijv. in `src/main/resources/data.sql`).  
