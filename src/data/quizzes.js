
const quizzes = {
  // 1. WEB DEVELOPMENT
  1: [
    { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctAnswer: 0, explanation: "HTML stands for Hyper Text Markup Language." },
    { id: 2, question: "Which tag creates the largest heading?", options: ["<h6>", "<head>", "<h1>", "<heading>"], correctAnswer: 2, explanation: "The h1 element represents the highest-level heading." },
    { id: 3, question: "Which HTML element creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correctAnswer: 1, explanation: "The anchor element creates hyperlinks." },
    { id: 4, question: "Which CSS property changes text color?", options: ["background", "font-style", "color", "text-decoration"], correctAnswer: 2, explanation: "The color property sets text color." },
    { id: 5, question: "Which CSS property controls space inside an element?", options: ["margin", "padding", "border", "outline"], correctAnswer: 1, explanation: "Padding creates space between content and border." },
    { id: 6, question: "Which CSS layout system is one-dimensional?", options: ["Grid", "Float", "Flexbox", "Position"], correctAnswer: 2, explanation: "Flexbox is designed for one-dimensional layouts." },
    { id: 7, question: "Which HTML attribute provides alternative image text?", options: ["title", "src", "alt", "href"], correctAnswer: 2, explanation: "The alt attribute provides alternative text for images." },
    { id: 8, question: "Which tag links an external CSS file?", options: ["<style>", "<css>", "<script>", "<link>"], correctAnswer: 3, explanation: "The link element connects an external stylesheet." },
    { id: 9, question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Styling System", "Colorful Style Syntax"], correctAnswer: 1, explanation: "CSS stands for Cascading Style Sheets." },
    { id: 10, question: "Which HTML element is used for JavaScript?", options: ["<js>", "<javascript>", "<script>", "<code>"], correctAnswer: 2, explanation: "JavaScript is commonly included using the script element." },
    { id: 11, question: "Which CSS unit is relative to the root font size?", options: ["px", "rem", "%", "vh"], correctAnswer: 1, explanation: "The rem unit is relative to the root element's font size." },
    { id: 12, question: "Which HTML element creates an unordered list?", options: ["<ol>", "<li>", "<ul>", "<list>"], correctAnswer: 2, explanation: "The ul element creates an unordered list." },
    { id: 13, question: "What is responsive web design?", options: ["A website with animations", "A layout adapting to different screen sizes", "A website without images", "A website using only tables"], correctAnswer: 1, explanation: "Responsive design adapts layouts to different devices." },
    { id: 14, question: "Which CSS rule applies styles at specific screen conditions?", options: ["@media", "@screen", "@device", "@responsive"], correctAnswer: 0, explanation: "Media queries apply CSS based on device and viewport conditions." },
    { id: 15, question: "What does the DOM represent?", options: ["Database Object Model", "Document Object Model", "Data Output Method", "Digital Ordinance Model"], correctAnswer: 1, explanation: "The DOM represents a document as a tree of objects." }
  ],

  // 2. PYTHON
  2: [
    { id: 1, question: "Which keyword defines a function in Python?", options: ["function", "define", "def", "fun"], correctAnswer: 2, explanation: "Python uses def to define functions." },
    { id: 2, question: "Which symbol starts a single-line comment?", options: ["//", "#", "/*", "--"], correctAnswer: 1, explanation: "The hash symbol starts a Python comment." },
    { id: 3, question: "Which data type stores True or False?", options: ["int", "str", "bool", "float"], correctAnswer: 2, explanation: "The bool type stores Boolean values." },
    { id: 4, question: "Which collection is ordered and mutable?", options: ["Tuple", "Set", "List", "Frozen set"], correctAnswer: 2, explanation: "Lists preserve order and can be modified." },
    { id: 5, question: "Which function displays output?", options: ["input()", "print()", "show()", "displayText()"], correctAnswer: 1, explanation: "print() displays output in Python." },
    { id: 6, question: "Which operator performs exponentiation?", options: ["^", "**", "//", "%"], correctAnswer: 1, explanation: "The ** operator calculates powers." },
    { id: 7, question: "Which keyword handles exceptions?", options: ["catch", "error", "try", "check"], correctAnswer: 2, explanation: "Python uses try with except to handle exceptions." },
    { id: 8, question: "What is the output of len('Python')?", options: ["5", "6", "7", "8"], correctAnswer: 1, explanation: "Python contains six characters." },
    { id: 9, question: "Which method adds an item to a list?", options: ["add()", "insertEnd()", "append()", "push()"], correctAnswer: 2, explanation: "append() adds an item to the end of a list." },
    { id: 10, question: "Which loop iterates over a sequence?", options: ["repeat", "for", "loop", "iterate"], correctAnswer: 1, explanation: "A for loop iterates over sequence elements." },
    { id: 11, question: "Which value represents no value in Python?", options: ["null", "undefined", "None", "empty"], correctAnswer: 2, explanation: "None represents the absence of a value." },
    { id: 12, question: "Which structure stores key-value pairs?", options: ["List", "Dictionary", "Tuple", "String"], correctAnswer: 1, explanation: "Dictionaries store data as key-value pairs." },
    { id: 13, question: "Which keyword imports a module?", options: ["include", "using", "import", "require"], correctAnswer: 2, explanation: "The import keyword loads modules." },
    { id: 14, question: "What does range(5) generate?", options: ["1 to 5", "0 to 4", "0 to 5", "1 to 4"], correctAnswer: 1, explanation: "range(5) generates values from 0 through 4." },
    { id: 15, question: "Which file mode opens a file for reading?", options: ["w", "a", "r", "x"], correctAnswer: 2, explanation: "The r mode opens a file for reading." }
  ],

  // 3. JAVA
  3: [
    { id: 1, question: "Which keyword declares a class in Java?", options: ["define", "class", "struct", "object"], correctAnswer: 1, explanation: "The class keyword declares a Java class." },
    { id: 2, question: "Which method is the usual Java program entry point?", options: ["start()", "run()", "main()", "init()"], correctAnswer: 2, explanation: "Execution normally begins in the main method." },
    { id: 3, question: "Which keyword creates an object?", options: ["class", "this", "new", "make"], correctAnswer: 2, explanation: "The new keyword creates objects." },
    { id: 4, question: "Which type stores whole numbers?", options: ["boolean", "int", "char", "String"], correctAnswer: 1, explanation: "The int type stores integer values." },
    { id: 5, question: "Which concept allows one class to inherit another?", options: ["Encapsulation", "Inheritance", "Compilation", "Casting"], correctAnswer: 1, explanation: "Inheritance allows a class to acquire another class's properties and methods." },
    { id: 6, question: "Which keyword prevents a class from being inherited?", options: ["static", "private", "final", "constant"], correctAnswer: 2, explanation: "A final class cannot be extended." },
    { id: 7, question: "Which symbol ends most Java statements?", options: [":", ".", ";", ","], correctAnswer: 2, explanation: "Most Java statements end with a semicolon." },
    { id: 8, question: "Which access modifier provides the widest access?", options: ["private", "protected", "public", "default"], correctAnswer: 2, explanation: "Public members can be accessed from other classes subject to their context." },
    { id: 9, question: "Which collection does not allow duplicate elements?", options: ["ArrayList", "Set", "LinkedList", "Vector"], correctAnswer: 1, explanation: "A Set stores unique elements." },
    { id: 10, question: "Which block handles an exception?", options: ["try", "catch", "finally", "All of these"], correctAnswer: 3, explanation: "Java exception handling can use try, catch, and finally blocks." },
    { id: 11, question: "What is method overloading?", options: ["Same method name with different parameters", "Deleting a method", "Changing a class name", "Hiding all methods"], correctAnswer: 0, explanation: "Overloaded methods share a name but have different parameter lists." },
    { id: 12, question: "Which keyword refers to the current object?", options: ["super", "this", "self", "current"], correctAnswer: 1, explanation: "this refers to the current object." },
    { id: 13, question: "Which interface is commonly used to define a task for a thread?", options: ["Runnable", "Serializable", "Comparable", "Cloneable"], correctAnswer: 0, explanation: "Runnable defines a task through its run method." },
    { id: 14, question: "Which package contains the Scanner class?", options: ["java.io", "java.util", "java.net", "java.lang"], correctAnswer: 1, explanation: "Scanner is part of java.util." },
    { id: 15, question: "Which keyword is used to implement an interface?", options: ["extends", "inherits", "implements", "interface"], correctAnswer: 2, explanation: "A class uses implements to implement an interface." }
  ],

  // 4. UI/UX DESIGN
  4: [
    { id: 1, question: "What does UI stand for?", options: ["User Interface", "Universal Internet", "User Information", "Unified Interaction"], correctAnswer: 0, explanation: "UI means User Interface." },
    { id: 2, question: "What does UX stand for?", options: ["User Extension", "User Experience", "Unified Experience", "User Execution"], correctAnswer: 1, explanation: "UX means User Experience." },
    { id: 3, question: "What is a wireframe?", options: ["Final website code", "Basic layout structure", "Database diagram", "Marketing poster"], correctAnswer: 1, explanation: "A wireframe outlines the structure of a digital interface." },
    { id: 4, question: "What is a prototype?", options: ["An interactive design model", "A finished database", "A programming language", "A server"], correctAnswer: 0, explanation: "A prototype simulates how a product may work." },
    { id: 5, question: "What is usability?", options: ["How easy a product is to use", "How expensive a product is", "How many colors it has", "How large a file is"], correctAnswer: 0, explanation: "Usability measures ease and effectiveness of use." },
    { id: 6, question: "What is visual hierarchy?", options: ["Random element placement", "Organizing elements by importance", "Using only one font", "Removing navigation"], correctAnswer: 1, explanation: "Visual hierarchy guides attention through levels of importance." },
    { id: 7, question: "Why is contrast important?", options: ["To reduce usability", "To improve distinction and readability", "To increase loading time", "To hide content"], correctAnswer: 1, explanation: "Contrast helps users distinguish interface elements." },
    { id: 8, question: "What is a user persona?", options: ["A fictional profile based on research", "A source code file", "A color palette", "A design tool"], correctAnswer: 0, explanation: "Personas represent researched user types and their needs." },
    { id: 9, question: "What is a call-to-action button?", options: ["A button prompting a specific action", "A decorative icon", "A background image", "A navigation font"], correctAnswer: 0, explanation: "A CTA encourages users to take a desired action." },
    { id: 10, question: "What is accessibility in design?", options: ["Design for people with varied abilities", "Design only for desktop", "Using complex animations", "Using many colors"], correctAnswer: 0, explanation: "Accessible design makes products usable by people with different abilities." },
    { id: 11, question: "What is usability testing?", options: ["Testing server speed only", "Observing users completing tasks", "Choosing brand colors", "Writing advertisements"], correctAnswer: 1, explanation: "Usability testing reveals how real users interact with a design." },
    { id: 12, question: "Which principle helps keep related items together?", options: ["Proximity", "Randomness", "Distortion", "Animation"], correctAnswer: 0, explanation: "Proximity groups related elements visually." },
    { id: 13, question: "What is responsive design?", options: ["Design adapting to screen sizes", "Design using only images", "Design without navigation", "Design for printing only"], correctAnswer: 0, explanation: "Responsive interfaces adapt to different screen dimensions." },
    { id: 14, question: "What is a design system?", options: ["A collection of reusable design rules and components", "A single logo", "A database server", "A browser extension"], correctAnswer: 0, explanation: "Design systems provide consistent reusable components and guidelines." },
    { id: 15, question: "Why conduct user research?", options: ["To understand user needs and behavior", "To avoid feedback", "To remove testing", "To increase code size"], correctAnswer: 0, explanation: "Research helps designers make informed user-centered decisions." }
  ],

  // 5. DATA SCIENCE
  5: [
    { id: 1, question: "What is data science?", options: ["Extracting insights from data", "Designing logos", "Building computer hardware", "Writing only HTML"], correctAnswer: 0, explanation: "Data science combines methods to analyze data and extract insights." },
    { id: 2, question: "What is a dataset?", options: ["A collection of data", "A programming loop", "A web browser", "A design template"], correctAnswer: 0, explanation: "A dataset is an organized collection of data." },
    { id: 3, question: "What is the mean?", options: ["Middle value", "Most frequent value", "Arithmetic average", "Largest value"], correctAnswer: 2, explanation: "The mean is the sum of values divided by their count." },
    { id: 4, question: "What is the median?", options: ["Middle value in ordered data", "Arithmetic average", "Most frequent value", "Difference between values"], correctAnswer: 0, explanation: "The median is the central value after sorting." },
    { id: 5, question: "What is data cleaning?", options: ["Removing errors and inconsistencies", "Deleting all records", "Encrypting a website", "Drawing charts only"], correctAnswer: 0, explanation: "Cleaning improves data quality by fixing issues." },
    { id: 6, question: "Which Python library is widely used for tabular data?", options: ["Pandas", "Pygame", "Turtle", "Flask"], correctAnswer: 0, explanation: "Pandas provides DataFrame tools for data manipulation." },
    { id: 7, question: "What does CSV stand for?", options: ["Comma-Separated Values", "Computer Stored Variables", "Common System Version", "Central Source View"], correctAnswer: 0, explanation: "CSV is a text format for comma-separated values." },
    { id: 8, question: "What is data visualization?", options: ["Representing data graphically", "Deleting records", "Writing algorithms only", "Compressing files"], correctAnswer: 0, explanation: "Visualization communicates data through charts and graphs." },
    { id: 9, question: "What is an outlier?", options: ["An unusually distant data value", "The average value", "A missing column", "A chart title"], correctAnswer: 0, explanation: "An outlier differs substantially from other observations." },
    { id: 10, question: "What does correlation measure?", options: ["Association between variables", "File size", "Program speed", "Database storage"], correctAnswer: 0, explanation: "Correlation measures the strength and direction of association." },
    { id: 11, question: "What is a training dataset?", options: ["Data used to train a model", "Data used only for display", "A backup folder", "A chart legend"], correctAnswer: 0, explanation: "Training data is used to fit a machine learning model." },
    { id: 12, question: "What is overfitting?", options: ["A model memorizing training data too closely", "A model with no input", "A missing dataset", "A data export format"], correctAnswer: 0, explanation: "Overfitting harms generalization to unseen data." },
    { id: 13, question: "Which chart is useful for showing proportions?", options: ["Pie chart", "Scatter plot", "Line chart", "Histogram"], correctAnswer: 0, explanation: "Pie charts can show parts of a whole." },
    { id: 14, question: "What is a missing value?", options: ["An absent data entry", "A duplicate chart", "A correct prediction", "A data label"], correctAnswer: 0, explanation: "Missing values indicate unavailable or unrecorded data." },
    { id: 15, question: "What is exploratory data analysis?", options: ["Examining data to understand patterns", "Deploying a website", "Writing user manuals", "Creating animations"], correctAnswer: 0, explanation: "EDA uses summaries and visualizations to investigate data." }
  ],

  // 6. REACT
  6: [
    { id: 1, question: "What is React?", options: ["A JavaScript library for user interfaces", "A database", "A programming language", "An operating system"], correctAnswer: 0, explanation: "React is a JavaScript library for building user interfaces." },
    { id: 2, question: "What is a React component?", options: ["A reusable UI building block", "A database table", "A CSS property", "A browser"], correctAnswer: 0, explanation: "Components let developers split interfaces into reusable parts." },
    { id: 3, question: "Which syntax is commonly used to describe React UI?", options: ["JSX", "SQL", "XML only", "Markdown"], correctAnswer: 0, explanation: "JSX lets developers write HTML-like syntax in JavaScript." },
    { id: 4, question: "Which hook manages local component state?", options: ["useEffect", "useState", "useRef", "useMemo"], correctAnswer: 1, explanation: "useState adds state to function components." },
    { id: 5, question: "What are props?", options: ["Inputs passed to components", "CSS selectors", "Database queries", "Browser settings"], correctAnswer: 0, explanation: "Props pass data from parent components to child components." },
    { id: 6, question: "What is the purpose of useEffect?", options: ["Handling side effects", "Creating CSS files", "Declaring HTML tags", "Installing packages"], correctAnswer: 0, explanation: "useEffect synchronizes components with external systems." },
    { id: 7, question: "How are lists commonly rendered in React?", options: ["Using map()", "Using print()", "Using querySelector()", "Using alert()"], correctAnswer: 0, explanation: "map() transforms array items into rendered elements." },
    { id: 8, question: "Why are keys used when rendering lists?", options: ["To help React identify elements", "To encrypt components", "To style buttons", "To create routes"], correctAnswer: 0, explanation: "Keys help React track list items between renders." },
    { id: 9, question: "What is the virtual DOM?", options: ["A lightweight representation of the UI", "A physical database", "A CSS framework", "A browser plugin"], correctAnswer: 0, explanation: "React uses a virtual representation to calculate UI updates." },
    { id: 10, question: "How do you pass a click handler in JSX?", options: ["onclick='run()'", "onClick={run}", "click={run}", "on-click='run'"], correctAnswer: 1, explanation: "React event handlers use camelCase props such as onClick." },
    { id: 11, question: "What is conditional rendering?", options: ["Showing UI based on conditions", "Rendering every element twice", "Removing all props", "Styling only links"], correctAnswer: 0, explanation: "Conditional rendering displays different UI based on a condition." },
    { id: 12, question: "What does lifting state up mean?", options: ["Moving shared state to a common parent", "Deleting component state", "Adding more CSS", "Creating a new database"], correctAnswer: 0, explanation: "Shared state can be moved to the closest common parent." },
    { id: 13, question: "Which hook accesses context values?", options: ["useContext", "useState", "useId", "useLayout"], correctAnswer: 0, explanation: "useContext reads and subscribes to context values." },
    { id: 14, question: "What is a controlled input?", options: ["An input whose value is controlled by React state", "An input without a value", "A disabled button", "A static heading"], correctAnswer: 0, explanation: "A controlled input receives its value from React state." },
    { id: 15, question: "What is React Router used for?", options: ["Client-side navigation", "Database backups", "Image editing", "CSS animations"], correctAnswer: 0, explanation: "React Router manages navigation and route rendering." }
  ],

  // 7. JAVASCRIPT
  7: [
    { id: 1, question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "define", "dim"], correctAnswer: 1, explanation: "let declares a block-scoped variable." },
    { id: 2, question: "Which operator checks strict equality?", options: ["=", "==", "===", "!="], correctAnswer: 2, explanation: "=== compares values without type coercion." },
    { id: 3, question: "Which method adds an item to an array's end?", options: ["push()", "pop()", "shift()", "slice()"], correctAnswer: 0, explanation: "push() appends elements to an array." },
    { id: 4, question: "Which method converts JSON text into an object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"], correctAnswer: 1, explanation: "JSON.parse() parses JSON text into a JavaScript value." },
    { id: 5, question: "What does typeof return?", options: ["A variable's type as a string", "A variable's value only", "A function result", "An array length"], correctAnswer: 0, explanation: "typeof returns a string indicating the operand's type." },
    { id: 6, question: "Which symbol is used for arrow functions?", options: ["->", "=>", "::", "<-"], correctAnswer: 1, explanation: "Arrow functions use the => syntax." },
    { id: 7, question: "Which method creates a new array by transforming elements?", options: ["map()", "forEach()", "push()", "join()"], correctAnswer: 0, explanation: "map() returns a new array of transformed values." },
    { id: 8, question: "What does DOM stand for?", options: ["Document Object Model", "Data Output Method", "Digital Object Machine", "Document Order Map"], correctAnswer: 0, explanation: "DOM stands for Document Object Model." },
    { id: 9, question: "Which keyword handles asynchronous waiting inside an async function?", options: ["defer", "await", "pause", "hold"], correctAnswer: 1, explanation: "await pauses the async function until a promise settles." },
    { id: 10, question: "What does Array.filter() return?", options: ["A new array of matching elements", "A single number", "The original array only", "A string"], correctAnswer: 0, explanation: "filter() creates an array containing elements that pass a test." },
    { id: 11, question: "Which value represents an intentional absence of an object value?", options: ["undefined", "null", "NaN", "false"], correctAnswer: 1, explanation: "null represents an intentional absence of a value." },
    { id: 12, question: "What is a closure?", options: ["A function retaining access to its lexical scope", "A closed browser tab", "A CSS selector", "A loop that never ends"], correctAnswer: 0, explanation: "Closures preserve access to variables from an outer scope." },
    { id: 13, question: "Which method selects an element by CSS selector?", options: ["getElement()", "querySelector()", "selectCSS()", "findNode()"], correctAnswer: 1, explanation: "querySelector() returns the first matching element." },
    { id: 14, question: "What is event bubbling?", options: ["An event moving from target toward ancestors", "An event being deleted", "A page refreshing", "A CSS animation"], correctAnswer: 0, explanation: "Bubbling propagates events from the target up through ancestors." },
    { id: 15, question: "Which statement exits a loop immediately?", options: ["continue", "skip", "break", "return only"], correctAnswer: 2, explanation: "break terminates the current loop." }
  ],

  // 8. DIGITAL MARKETING
  8: [
    { id: 1, question: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engagement Output", "Search Email Operation", "System Engine Organization"], correctAnswer: 0, explanation: "SEO improves visibility in organic search results." },
    { id: 2, question: "What is a keyword in SEO?", options: ["A search term users enter", "A website password", "An image file", "A programming command"], correctAnswer: 0, explanation: "Keywords represent terms people search for." },
    { id: 3, question: "What does PPC mean?", options: ["Pay Per Click", "Page Performance Code", "Public Promotion Campaign", "Post Per Customer"], correctAnswer: 0, explanation: "PPC is an advertising model where advertisers pay per click." },
    { id: 4, question: "What is a conversion?", options: ["A desired user action", "A page color", "A website error", "A keyword list"], correctAnswer: 0, explanation: "A conversion is a completed goal such as a purchase or signup." },
    { id: 5, question: "What is email marketing?", options: ["Promoting through email messages", "Building computer networks", "Editing videos", "Designing databases"], correctAnswer: 0, explanation: "Email marketing communicates promotional or useful content through email." },
    { id: 6, question: "What is a target audience?", options: ["The group a campaign aims to reach", "All website servers", "A design font", "A search algorithm"], correctAnswer: 0, explanation: "A target audience is the intended group for a campaign." },
    { id: 7, question: "What does CTR stand for?", options: ["Click-Through Rate", "Customer Tracking Record", "Content Testing Rule", "Campaign Time Report"], correctAnswer: 0, explanation: "CTR measures clicks relative to impressions." },
    { id: 8, question: "What is content marketing?", options: ["Creating useful content for an audience", "Sending random advertisements", "Removing website content", "Buying computer equipment"], correctAnswer: 0, explanation: "Content marketing attracts and engages audiences with relevant content." },
    { id: 9, question: "What is social media engagement?", options: ["Interactions such as likes and comments", "Server storage", "Page loading time", "Email encryption"], correctAnswer: 0, explanation: "Engagement includes audience interactions with social content." },
    { id: 10, question: "What is a landing page?", options: ["A page designed for a specific campaign goal", "A website's source code", "A database table", "A browser homepage setting"], correctAnswer: 0, explanation: "Landing pages guide visitors toward a focused action." },
    { id: 11, question: "What is A/B testing?", options: ["Comparing two versions", "Testing two computers", "Writing two emails", "Creating two accounts"], correctAnswer: 0, explanation: "A/B testing compares variations to determine which performs better." },
    { id: 12, question: "What is organic traffic?", options: ["Visitors from unpaid search results", "Visitors from paid ads", "Internal employee visits only", "Automated server requests"], correctAnswer: 0, explanation: "Organic traffic comes from unpaid search results." },
    { id: 13, question: "What is a marketing funnel?", options: ["Stages from awareness to conversion", "A graphic design tool", "A payment gateway", "A website hosting plan"], correctAnswer: 0, explanation: "A funnel describes stages in the customer journey." },
    { id: 14, question: "What is a backlink?", options: ["A link from another website to yours", "A deleted web page", "A website password", "A social media comment"], correctAnswer: 0, explanation: "Backlinks are incoming links from other websites." },
    { id: 15, question: "Why use analytics in marketing?", options: ["To measure campaign performance", "To change programming languages", "To remove all advertisements", "To create hardware"], correctAnswer: 0, explanation: "Analytics helps evaluate results and improve campaigns." }
  ],

  // 9. GRAPHIC DESIGN
  9: [
    { id: 1, question: "What is graphic design?", options: ["Visual communication using design elements", "Writing database queries", "Managing networks", "Building operating systems"], correctAnswer: 0, explanation: "Graphic design communicates ideas through visual elements." },
    { id: 2, question: "What is typography?", options: ["The art of arranging text", "A photo format", "A coding language", "A printing machine"], correctAnswer: 0, explanation: "Typography concerns the style and arrangement of text." },
    { id: 3, question: "What are primary colors in traditional RYB color theory?", options: ["Red, yellow, blue", "Green, orange, purple", "Black, white, gray", "Pink, brown, teal"], correctAnswer: 0, explanation: "Red, yellow, and blue are primary colors in the traditional RYB model." },
    { id: 4, question: "What is a vector graphic?", options: ["An image made from paths and mathematical shapes", "A photograph made of pixels", "A plain text file", "A sound recording"], correctAnswer: 0, explanation: "Vector graphics use paths and can scale without pixelation." },
    { id: 5, question: "What is raster graphics?", options: ["Images made from pixels", "Images made only from paths", "Audio files", "Text documents"], correctAnswer: 0, explanation: "Raster images are made from a grid of pixels." },
    { id: 6, question: "What does DPI commonly describe in print?", options: ["Dots per inch", "Design pixels index", "Digital page input", "Data per image"], correctAnswer: 0, explanation: "DPI means dots per inch." },
    { id: 7, question: "What is negative space?", options: ["Empty space around design elements", "A dark color", "A file error", "A font family"], correctAnswer: 0, explanation: "Negative space is the area around and between objects." },
    { id: 8, question: "What is alignment in design?", options: ["Arranging elements along shared edges or axes", "Changing image resolution", "Adding animation", "Compressing a file"], correctAnswer: 0, explanation: "Alignment creates visual order and connection." },
    { id: 9, question: "Which format is commonly used for transparent web images?", options: ["PNG", "BMP", "TXT", "MP3"], correctAnswer: 0, explanation: "PNG supports transparency." },
    { id: 10, question: "What is a logo?", options: ["A visual symbol identifying a brand", "A database record", "A page margin", "A programming function"], correctAnswer: 0, explanation: "A logo helps identify a brand or organization." },
    { id: 11, question: "What is color harmony?", options: ["Pleasant relationships between colors", "Using random colors", "Removing all colors", "Increasing image size"], correctAnswer: 0, explanation: "Color harmony creates visually pleasing combinations." },
    { id: 12, question: "What is kerning?", options: ["Adjusting space between specific letter pairs", "Changing page orientation", "Cropping a photograph", "Adding a border"], correctAnswer: 0, explanation: "Kerning adjusts spacing between individual character pairs." },
    { id: 13, question: "What is a mockup?", options: ["A visual presentation of a design in context", "A programming error", "A database backup", "A font file"], correctAnswer: 0, explanation: "Mockups show how a design may look in a real-world setting." },
    { id: 14, question: "Which format is commonly suitable for scalable logos?", options: ["SVG", "JPEG", "MP3", "GIF only"], correctAnswer: 0, explanation: "SVG is a vector format suitable for scalable graphics." },
    { id: 15, question: "What is the rule of thirds?", options: ["A composition guide dividing an image into nine sections", "A font-size rule", "A color-printing method", "A file compression method"], correctAnswer: 0, explanation: "The rule of thirds helps position important elements in a composition." }
  ],

  // 10. MACHINE LEARNING
  10: [
    { id: 1, question: "What is machine learning?", options: ["Systems learning patterns from data", "Manual website styling", "A type of computer monitor", "A file format"], correctAnswer: 0, explanation: "Machine learning enables systems to learn patterns from data." },
    { id: 2, question: "What is supervised learning?", options: ["Learning from labeled data", "Learning without any data", "Learning only by guessing", "Manual data entry"], correctAnswer: 0, explanation: "Supervised learning uses labeled examples." },
    { id: 3, question: "What is unsupervised learning?", options: ["Finding patterns in unlabeled data", "Using only labeled examples", "Writing HTML", "Creating databases"], correctAnswer: 0, explanation: "Unsupervised learning explores structure in unlabeled data." },
    { id: 4, question: "What is a classification task?", options: ["Predicting a category", "Predicting only a continuous number", "Deleting data", "Compressing images"], correctAnswer: 0, explanation: "Classification assigns inputs to categories." },
    { id: 5, question: "What is regression used for?", options: ["Predicting numerical values", "Grouping text labels only", "Removing duplicates", "Creating charts only"], correctAnswer: 0, explanation: "Regression predicts continuous numerical outcomes." },
    { id: 6, question: "What is a feature in machine learning?", options: ["An input variable", "A model error only", "A final report", "A programming language"], correctAnswer: 0, explanation: "Features are input variables used by a model." },
    { id: 7, question: "What is a label?", options: ["The target value to predict", "A chart color", "A file extension", "A database password"], correctAnswer: 0, explanation: "A label is the target output in supervised learning." },
    { id: 8, question: "Why split data into training and testing sets?", options: ["To evaluate performance on unseen data", "To double the dataset", "To remove all labels", "To change file formats"], correctAnswer: 0, explanation: "Testing evaluates how well a model generalizes." },
    { id: 9, question: "What is a neural network inspired by?", options: ["The interconnected structure of biological neurons", "A computer keyboard", "A database table", "A web page"], correctAnswer: 0, explanation: "Artificial neural networks are loosely inspired by biological neural systems." },
    { id: 10, question: "What is overfitting?", options: ["Performing well on training data but poorly on new data", "Performing equally on all data", "Having no model parameters", "Using no training data"], correctAnswer: 0, explanation: "Overfitting occurs when a model fails to generalize." },
    { id: 11, question: "What is underfitting?", options: ["A model failing to learn important patterns", "A model memorizing training data", "A perfectly accurate model", "A missing file"], correctAnswer: 0, explanation: "Underfitting occurs when a model is too simple to capture patterns." },
    { id: 12, question: "What is a decision tree?", options: ["A model that makes decisions through feature-based branches", "A database server", "A chart of file sizes", "A programming editor"], correctAnswer: 0, explanation: "Decision trees split data using decision rules." },
    { id: 13, question: "What does accuracy measure in classification?", options: ["Proportion of correct predictions", "Training time only", "Number of features", "Dataset size"], correctAnswer: 0, explanation: "Accuracy is the fraction of predictions that are correct." },
    { id: 14, question: "What is clustering?", options: ["Grouping similar data points", "Predicting a continuous number", "Sorting files by name", "Removing model parameters"], correctAnswer: 0, explanation: "Clustering groups data points based on similarity." },
    { id: 15, question: "What is a hyperparameter?", options: ["A setting chosen before or during model training", "The predicted label", "A missing data value", "A chart title"], correctAnswer: 0, explanation: "Hyperparameters configure the model training process." }
  ],

  // 11. CLOUD COMPUTING
  11: [
    { id: 1, question: "What is cloud computing?", options: ["Delivering computing services over the internet", "Using only local hard drives", "Designing websites offline", "Writing computer games"], correctAnswer: 0, explanation: "Cloud computing provides computing resources over networks." },
    { id: 2, question: "What does IaaS stand for?", options: ["Infrastructure as a Service", "Internet as a System", "Information as a Software", "Interface and Storage"], correctAnswer: 0, explanation: "IaaS provides virtualized computing infrastructure." },
    { id: 3, question: "What does PaaS stand for?", options: ["Platform as a Service", "Program as a System", "Private Application Storage", "Process as Software"], correctAnswer: 0, explanation: "PaaS provides a platform for developing and deploying applications." },
    { id: 4, question: "What does SaaS stand for?", options: ["Software as a Service", "Storage as a System", "Server and Security", "System as a Software"], correctAnswer: 0, explanation: "SaaS delivers software applications over the internet." },
    { id: 5, question: "What is scalability?", options: ["Adjusting resources to meet demand", "Deleting cloud accounts", "Changing a website logo", "Reducing all storage to zero"], correctAnswer: 0, explanation: "Scalability allows resources to grow or shrink as needed." },
    { id: 6, question: "What is a virtual machine?", options: ["A software-based computer environment", "A physical keyboard", "A cloud password", "A web browser"], correctAnswer: 0, explanation: "A virtual machine emulates a computer system." },
    { id: 7, question: "What is cloud storage?", options: ["Storing data on remotely managed systems", "Saving data only on paper", "A programming language", "A graphics editor"], correctAnswer: 0, explanation: "Cloud storage stores data on remote infrastructure accessible over a network." },
    { id: 8, question: "What is a public cloud?", options: ["Cloud services offered to multiple customers", "A private computer at home", "A local-only database", "A disconnected server"], correctAnswer: 0, explanation: "Public cloud resources are offered by providers to customers." },
    { id: 9, question: "What is a private cloud?", options: ["Cloud infrastructure dedicated to one organization", "A public social network", "A shared web browser", "A free email account"], correctAnswer: 0, explanation: "A private cloud is dedicated to a single organization." },
    { id: 10, question: "What is a hybrid cloud?", options: ["A combination of private and public cloud environments", "A computer without internet", "A type of monitor", "A programming framework"], correctAnswer: 0, explanation: "Hybrid cloud combines different cloud environments." },
    { id: 11, question: "What is serverless computing?", options: ["Running code without managing servers directly", "Computing without hardware anywhere", "Using only desktop computers", "Removing all network access"], correctAnswer: 0, explanation: "Serverless platforms manage infrastructure while users deploy code." },
    { id: 12, question: "What is load balancing?", options: ["Distributing traffic across multiple resources", "Deleting server logs", "Encrypting images", "Compressing source code"], correctAnswer: 0, explanation: "Load balancing distributes requests to improve availability and performance." },
    { id: 13, question: "What is an availability zone?", options: ["An isolated location within a cloud region", "A website theme", "A programming language", "A billing password"], correctAnswer: 0, explanation: "Availability zones provide isolated infrastructure locations within a region." },
    { id: 14, question: "Why are backups important in cloud computing?", options: ["To recover data after loss or failure", "To increase screen brightness", "To change account names", "To remove encryption"], correctAnswer: 0, explanation: "Backups help restore data after accidental deletion or failures." },
    { id: 15, question: "What is cloud monitoring?", options: ["Tracking resource health and performance", "Designing a logo", "Writing marketing content", "Creating user passwords only"], correctAnswer: 0, explanation: "Monitoring tracks cloud systems, usage, and performance." }
  ],

  // 12. CYBERSECURITY
  12: [
    { id: 1, question: "What is cybersecurity?", options: ["Protecting systems and data from digital threats", "Designing website layouts", "Creating animations", "Managing social media"], correctAnswer: 0, explanation: "Cybersecurity protects systems, networks, and information." },
    { id: 2, question: "What is phishing?", options: ["Fraudulent attempts to steal sensitive information", "A data backup process", "A programming language", "A network cable"], correctAnswer: 0, explanation: "Phishing tricks people into revealing information or taking unsafe actions." },
    { id: 3, question: "What is malware?", options: ["Malicious software", "A secure password", "A hardware component", "A backup file"], correctAnswer: 0, explanation: "Malware is software designed to cause harm or unauthorized activity." },
    { id: 4, question: "What is ransomware?", options: ["Malware that demands payment to restore access", "A password manager", "A firewall setting", "A backup utility"], correctAnswer: 0, explanation: "Ransomware encrypts or blocks access to data and demands payment." },
    { id: 5, question: "What is a firewall?", options: ["A system that filters network traffic", "A photo editor", "A storage device", "A programming language"], correctAnswer: 0, explanation: "Firewalls control network traffic according to security rules." },
    { id: 6, question: "What is encryption?", options: ["Converting data into a protected form", "Deleting all files", "Increasing internet speed", "Formatting a hard drive"], correctAnswer: 0, explanation: "Encryption transforms readable data into ciphertext." },
    { id: 7, question: "What is multi-factor authentication?", options: ["Using two or more verification factors", "Using the same password twice", "Logging in without verification", "Sharing an account"], correctAnswer: 0, explanation: "MFA requires multiple forms of identity verification." },
    { id: 8, question: "What is a strong password practice?", options: ["Using long, unique passwords", "Using your name only", "Reusing one password everywhere", "Sharing passwords publicly"], correctAnswer: 0, explanation: "Long and unique passwords reduce the risk of account compromise." },
    { id: 9, question: "What is a vulnerability?", options: ["A weakness that could be exploited", "A security certificate", "A backup copy", "A network address"], correctAnswer: 0, explanation: "A vulnerability is a weakness in a system or process." },
    { id: 10, question: "What is a security patch?", options: ["An update that fixes software issues or vulnerabilities", "A new desktop wallpaper", "A password hint", "A network cable"], correctAnswer: 0, explanation: "Patches fix bugs and security weaknesses." },
    { id: 11, question: "What does HTTPS help provide?", options: ["Encrypted communication between browser and website", "Unlimited storage", "A guaranteed safe website", "Automatic virus removal"], correctAnswer: 0, explanation: "HTTPS uses TLS to protect data in transit." },
    { id: 12, question: "What is social engineering?", options: ["Manipulating people into revealing information or taking actions", "Building social networks", "Designing user interfaces", "Writing software tests"], correctAnswer: 0, explanation: "Social engineering exploits human behavior rather than only technical flaws." },
    { id: 13, question: "What is the principle of least privilege?", options: ["Giving users only the access they need", "Giving everyone administrator access", "Sharing all passwords", "Disabling all accounts"], correctAnswer: 0, explanation: "Least privilege limits access to what is necessary." },
    { id: 14, question: "Why are regular backups important?", options: ["They help recover data after an incident", "They prevent every possible attack", "They remove the need for passwords", "They make software updates unnecessary"], correctAnswer: 0, explanation: "Backups support recovery from data loss and ransomware incidents." },
    { id: 15, question: "What should you do with a suspicious email attachment?", options: ["Avoid opening it and report it", "Open it immediately", "Forward it to everyone", "Enter your password into it"], correctAnswer: 0, explanation: "Do not open unexpected attachments; report suspicious messages through trusted channels." }
  ]
};

export default quizzes;
