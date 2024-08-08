<h1>Pantry Tracker👩🏻‍🍳🍰🥣♡</h1>
<p>Pantry Tracker is a web application that helps you keep track of your pantry items and suggests recipes based on the ingredients you have. It leverages Firebase for the backend and integrates OpenAI for recipe suggestions.</p>

<h2>Demo</h2>
<p>You can check out the live demo of the application <a href="https://pantry-tracker-delta-five.vercel.app/" target="_blank">here</a>.</p>
<img width="500" alt="Screenshot 2024-08-03 at 2 27 04 PM" src="https://github.com/user-attachments/assets/2e571ce9-31c5-477d-bdf3-718ea8f625ab">

<h2>Features</h2>
<ul>
    <li>Add, remove, and update pantry items.</li>
    <li>Get recipe suggestions based on your current pantry items using AI.</li>
    <li>User-friendly interface with interactive modals for adding items and viewing recipes.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
    <li>React</li>
    <li>Next.js</li>
    <li>Firebase Firestore</li>
    <li>Material-UI</li>
    <li>OpenAI API</li>
</ul>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
<p>Node.js and npm installed on your machine.</p>

<h3>Installation</h3>
<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/KhanhHa26/Pantry-Tracker.git
cd Pantry-Tracker</code></pre>
    </li>
    <li>Install the dependencies:
        <pre><code>npm install</code></pre>
    </li>
    <li>Set up Firebase:
        <ul>
            <li>Create a Firebase project.</li>
            <li>Enable Firestore.</li>
            <li>Obtain your Firebase config and replace the placeholder values in the <code>firebase.js</code> file.</li>
        </ul>
    </li>
    <li>Set up OpenAI:
        <ul>
            <li>Obtain your OpenAI API key.</li>
            <li>Create an <code>.env</code> file in the root of the project and add your OpenAI API key:
                <pre><code>OPENAI_API_KEY=your_openai_api_key</code></pre>
            </li>
        </ul>
    </li>
</ol>

<h3>Running the Application</h3>
<ol>
    <li>Start the development server:
        <pre><code>npm run dev</code></pre>
    </li>
    <li>Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser to view the application.</li>
</ol>
