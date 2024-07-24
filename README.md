# BigOAnalyzer
 Compare the BigO time and space complexities and optimize your solutions. 

## Project Description
A website with two code editor windows side by side where users can type solutions and analyze the time and space complexity of each using the ChatGPT API to compare the Big-O time and space complexity of the solutions.

## Key Decisions

### Skipping CodeMirror for Initial Implementation
- **Reason**: To simplify the initial development and focus on core functionality.
- **Implementation**: Use plain `<textarea>` elements for code input instead of the CodeMirror editor.
- **Future Plan**: Integrate CodeMirror at a later stage to enhance the user experience with syntax highlighting and other features.

### Using `.gitignore` to Ignore Node.js Files
- **Reason**: The `node_modules` directory can be very large and contains files that are not necessary to track in version control. Including these files would unnecessarily bloat the repository.
- **Implementation**: Create a `.gitignore` file with the Node template to automatically ignore `node_modules` and other common Node-related files.

## Project File Structure
bigoanalyzer/
├── .firebase/ # Firebase configuration files
├── .firebaserc # Firebase project alias
├── .gitignore # Git ignore file
├── README.md # Project README file
├── firebase.json # Firebase project configuration
├── firestore.rules # Firestore security rules
├── public/ # Public directory for frontend files
│ ├── index.html # Main HTML file
│ └── style.css # CSS file for styling
├── functions/ # Directory for Firebase Functions
│ ├── package.json # NPM package file for functions
│ ├── index.js # Main file for Firebase Functions
│ └── node_modules/ # Node.js dependencies for functions
└── .git/ # Git directory for version control
