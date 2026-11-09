// All portfolio content lives here. Edit this file to update the site.
// Use **double asterisks** around text to make it bold.

export const profile = {
  name: 'Tushar Arora',
  role: 'Full Stack AI Engineer',
  location: 'Ghaziabad, India',
  email: 'tushar.ai.dev@gmail.com',
  // Stored as a perfect square; the Contact page lets visitors "solve" it to reveal the number.
  phoneSquared: '78341703057303861904',
  linkedin: 'https://www.linkedin.com/in/tushararora-dev/',
  github: 'https://github.com/tushararora-dev',
  whatsapp: 'https://wa.me/918851084852',
  instagram: 'https://www.instagram.com/tushar.oclock',
  resume: 'https://drive.google.com/drive/folders/1uNYBl-Eh33fBqium--_qZjJZq3Jp98TD?usp=drive_link',
  // Needed for the live age counter. It is visible in the page's JavaScript.
  birthdate: '2001-04-18T00:00:00',
  codingSince: 2021,
  freelancingSince: 2024,
  // City-level on purpose (not a street address).
  gps: { lat: 28.6692, lon: 77.4538, place: 'Ghaziabad, Uttar Pradesh, India' },
  tagline:
    'I build generative AI products end to end, from LLM agents and RAG pipelines to the UI people actually use.',
  summary:
    'Full Stack AI Engineer with **1+ year of experience**. At Accumax I own all AI features of a FinTech tax platform: **11+ Anthropic Claude features**, **multi-agent workflows** and **RAG** over a 366K+ document IRS corpus, built with Angular, Node.js and Azure. MCA in AI (CGPA 8.9/10) with a strong base in **machine learning**, deep learning, NLP and **MLOps on AWS**.',
}

/** Rotates in the sidebar. Every entry is backed by real work on this site. */
export const roles = [
  'Full Stack AI Engineer',
  'GenAI Engineer',
  'AI Agent Developer',
  'ML Engineer',
  'MLOps Engineer',
  'Data Scientist',
  'Data Analyst',
  'Python Developer',
  'Prompt Engineer',
]

export const stats = [
  { value: '1+', label: 'Year building production AI' },
  { value: '11+', label: 'Claude-powered AI features' },
  { value: '366K+', label: 'Documents in IRS RAG corpus' },
  { value: '150+', label: 'Tax form types detected' },
]

export const services = [
  { title: 'Generative AI and Agents', text: 'LLM apps with Claude and GPT: multi-agent workflows, tool use and RAG over real document corpora.' },
  { title: 'Full Stack AI Apps', text: 'Angular, Node.js and Express front to back, so AI features ship as real products, not demos.' },
  { title: 'Machine Learning', text: 'Forecasting, classification and recommendation, from feature engineering to evaluation.' },
  { title: 'Deep Learning', text: 'Neural networks for vision and language problems, trained and tuned in TensorFlow and PyTorch.' },
  { title: 'Computer Vision', text: 'Extracting insight from images and video with OpenCV and CNNs.' },
  { title: 'Natural Language Processing', text: 'Understanding and generating human language: transformers, embeddings and text pipelines.' },
  { title: 'Data Analytics', text: 'Turning raw data into decisions with SQL, Pandas and dashboards in Power BI and Tableau.' },
  { title: 'Big Data', text: 'Analyzing large datasets with PySpark, Databricks and Dask.' },
  { title: 'MLOps and LLMOps', text: 'Docker, CI/CD, MLflow and DVC on AWS and Azure to deploy and monitor ML and LLM systems.' },
]

export const offTheClock = [
  { title: 'Esports and gaming', text: "Esports is a big part of who I am, and I manage Discord communities too." },
  { title: 'Budget travel', text: "I'm a budget traveller who enjoys planning trips and building itineraries." },
  { title: 'Creative side', text: 'Video editing, audio editing and graphic design, plus SEO and digital marketing.' },
]

export const skills = [
  {
    group: 'Generative AI',
    items: [
      'LLMs (Claude, GPT-4)', 'Agentic AI', 'Multi-Agent Systems', 'RAG', 'Vector Search', 'Embeddings',
      'LangChain', 'LlamaIndex', 'CrewAI', 'AutoGen', 'Prompt Engineering', 'Hugging Face', 'Transformers',
      'Fine-tuning', 'Unsloth', 'Ollama', 'LM Studio', 'Groq', 'AWS Bedrock', 'Azure AI Search', 'ChromaDB',
      'FAISS', 'Pinecone',
    ],
  },
  {
    group: 'Web and APIs',
    items: [
      'Angular', 'Node.js', 'Express.js', 'REST APIs', 'FastAPI', 'Flask', 'Django', 'HTML', 'CSS', 'Bootstrap',
      'WordPress', 'Streamlit', 'Gradio', 'Chainlit', 'LiveKit', 'Twilio',
    ],
  },
  {
    group: 'Languages and Databases',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'MongoDB', 'MySQL'],
  },
  {
    group: 'Machine and Deep Learning',
    items: [
      'PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'XGBoost', 'LightGBM', 'Optuna', 'AutoML', 'OpenCV',
      'Computer Vision', 'NLP', 'spaCy', 'NLTK', 'SciPy', 'FuzzyWuzzy',
    ],
  },
  {
    group: 'Data Analysis',
    items: [
      'SQL', 'Statistics', 'Pandas', 'NumPy', 'Power BI', 'Tableau', 'Excel', 'Matplotlib', 'Seaborn', 'Plotly',
      'Bokeh', 'ggplot', 'YData Profiling', 'Sweetviz', 'D-Tale', 'AutoViz', 'WordCloud', 'Beautiful Soup',
      'Selenium', 'Octoparse',
    ],
  },
  {
    group: 'Big Data and Streaming ML',
    items: ['PySpark', 'Spark MLlib', 'Databricks', 'Dask', 'AWS ETL', 'River', 'Vowpal Wabbit', 'MOA', 'SAMOA', 'StreamDM', 'scikit-multiflow'],
  },
  {
    group: 'MLOps and Cloud',
    items: [
      'Docker', 'Git', 'GitHub', 'GitHub Actions', 'CI/CD', 'MLflow', 'DVC', 'Cookiecutter', 'Pytest', 'Postman',
      'Linux', 'AWS (EC2, S3, ECR, Lambda, CodeDeploy, Auto Scaling, Load Balancer, VPC, SageMaker)',
      'Azure Functions', 'GCP (Vertex AI)', 'Heroku', 'PythonAnywhere',
    ],
  },
  {
    group: 'Other Skills',
    items: [
      'Video Editing', 'Audio Editing', 'Graphic Design', 'SEO', 'Digital Marketing', 'Itinerary Planning',
      'Planning and Management', 'Discord Management', 'Gaming',
    ],
  },
]

export type Job = {
  company: string
  role: string
  period: string
  link?: { label: string; href: string }
  bullets: string[]
}

export const experience: Job[] = [
  {
    company: 'Accumax',
    role: 'Full Stack Developer (AI)',
    period: 'Sep 2025 – Present',
    link: { label: 'accumax.ai', href: 'https://accumax.ai' },
    bullets: [
      'Own end-to-end development of **all AI features** (LLM integration, REST APIs, UI) in a FinTech tax practice platform built with **Angular, TypeScript, Node.js, Express.js and MongoDB**; in **pilot testing with 10 firms**.',
      'Built **11+ generative AI features** with **Anthropic Claude**, each backed by dedicated **sub-agents**: AI Tax Planner, Tax Return Reviewer and Preparer, Tax Engine, AI Profiler, AI Rewrite, Client Letter Generator and a Lead Generation Chatbot.',
      'Designed **multi-agent orchestration** for the Research Chatbot and Audit Defense Assistant, with **two RAG pipelines** (**Azure AI Search** vector search, **Azure Functions**) over a **366K+ document** IRS corpus and firm files.',
      'Built a **Form Sniffer** that detects and classifies **150+ tax form types** using document parsing and regex, and **Collab Desk**, a real-time collaboration workspace on **LiveKit**; also ran QA testing before release.',
    ],
  },
  {
    company: 'Banao Technologies',
    role: 'AI/ML Engineer Intern',
    period: 'Sep 2024 – Nov 2024',
    link: { label: 'banao.tech', href: 'https://banao.tech' },
    bullets: [
      'Selected from **200+ candidates** after building a **Transformer-based translator from scratch** (no pretrained models).',
      'Built an **AI agent** that generates complete programming courses from a topic: it drafts the content outline, explains each point while live-typing code in **VS Code**, and produces narrated **audio-video lessons**.',
      'Developed a **WhatsApp chatbot** for warehouse operations using **Twilio** and an **AI agent**.',
    ],
  },
  {
    company: 'SynapseHealthTech',
    role: 'ML Engineer Intern',
    period: 'Jun 2024 – Aug 2024',
    link: { label: 'synapsehealthtech.com', href: 'https://synapsehealthtech.com' },
    bullets: [
      'Built and tuned **11 machine learning models** for an early-stage HealthTech startup, each for a different clinical task such as **arrhythmia** and **thyroid disease detection**; used in **product demos to hospitals**.',
    ],
  },
]

export type Entry = { org: string; role: string; period: string; text: string }

export const internships: Entry[] = [
  { org: 'Nitrado', role: 'Data Analyst Intern', period: 'Dec 2023 – Jan 2024', text: "Analyzed player data from a Rust game server." },
  { org: 'Medichoice Pharma', role: 'Operations Intern', period: 'May 2023 – Jun 2023', text: 'IT and graphic design operations.' },
  { org: 'Globalshala', role: 'Data Analyst Intern', period: 'May 2022 – Jun 2022', text: 'Reviewed ad campaign performance to decide on discontinuation.' },
  { org: 'iNeuron', role: 'Project-Based Internship', period: 'Feb 2022 – Apr 2022', text: 'Built a predictive model for thyroid disease.' },
  { org: 'Feynn Lab', role: 'ML Engineer Intern', period: 'Feb 2022 – Apr 2022', text: 'Medical market segmentation for a biotech startup.' },
]

export const simulations: Entry[] = [
  { org: 'Cognizant', role: 'AI Job Simulation', period: 'Apr 2024 – May 2024', text: 'Developed an AI model to reduce supply chain costs by 15% for Gala Groceries (simulated client).' },
  { org: 'BCG X', role: 'GenAI Job Simulation', period: 'Apr 2024 – May 2024', text: 'Integrated financial data from 10-K and 10-Q reports into a user-friendly financial insights chatbot.' },
  { org: 'TATA', role: 'Data Analytics Job Simulation', period: 'Mar 2024 – Apr 2024', text: 'Reviewed and visualized data to answer 4 key questions from the CMO and CEO of an online retail store.' },
  { org: 'Accenture', role: 'Data Analytics Job Simulation', period: 'Mar 2024 – Apr 2024', text: 'Analyzed 7 datasets on content trends in a social buzz app to guide strategic decisions.' },
]

export type Project = {
  title: string
  date: string
  href: string
  description: string
  tags: string[]
}

export const projects: Project[] = [
  {
    title: 'Uber Demand Forecasting System',
    date: 'Oct 2024',
    href: 'https://github.com/tushararora-dev',
    description:
      'End-to-end **time-series forecasting** pipeline predicting cab demand across **30 city regions** (Mini-Batch KMeans) at 15-minute intervals, reaching **7.9% MAPE**. Tuned with **Optuna**, tracked in **MLflow** and served on a Streamlit dashboard.',
    tags: ['Scikit-learn', 'Optuna', 'MLflow', 'DagsHub', 'AWS', 'Streamlit'],
  },
  {
    title: 'Spotify Hybrid Music Recommender',
    date: 'Nov 2024',
    href: 'https://github.com/tushararora-dev',
    description:
      'A **hybrid recommender**: 70% **collaborative** and 30% **content-based filtering**, with diversity-aware ranking. Productionized with **CI/CD**, Docker and **AWS** (S3, ECR, EC2, CodeDeploy, Auto Scaling) using **blue-green deployment**.',
    tags: ['Dask', 'DVC', 'Docker', 'Pytest', 'AWS'],
  },
  {
    title: 'Self-Driving Car: End-to-End Deep Learning',
    date: 'Dec 2024',
    href: 'https://github.com/tushararora-dev',
    description:
      'Trained a **CNN (NVIDIA architecture)** mapping camera frames to steering and throttle in the Udacity simulator, reaching **0.03 validation loss** with **image augmentation**; served real-time predictions via Flask and SocketIO.',
    tags: ['TensorFlow', 'Keras', 'OpenCV', 'Flask', 'SocketIO'],
  },
  {
    title: 'SEO Optimizer AI Agent',
    date: 'May 2024',
    href: 'https://github.com/tushararora-dev',
    description:
      'A **GenAI app** that turns a YouTube video into SEO assets (titles, descriptions, tags, timestamps) and **DALL-E 3** thumbnails; containerized with **Docker** and deployed on AWS EC2.',
    tags: ['LangChain', 'OpenAI GPT-4', 'DALL-E 3', 'Docker', 'AWS EC2'],
  },
]

export const moreProjects: { title: string; text: string }[] = [
  { title: 'PhonePe Transaction Dashboard', text: 'Streamlit dashboard that analyzes PhonePe transaction files, such as total spend by month.' },
  { title: 'Discord Chat Analysis Bot', text: 'Analyzes exported chats with 6 metrics and 9 graphs, such as the most active users.' },
  { title: 'GTA 5 Races Recommendation', text: 'Streamlit recommender that suggests GTA 5 races with previews and bookmark links.' },
  { title: 'Image Difference Detection', text: 'Python library published on PyPI that compares two images, including pixel-wise comparison.' },
  { title: 'Adult-Content Classification', text: 'Classification model that detects adult content.' },
  { title: 'YouTube Influencer Insights', text: 'Chrome extension that surfaces insights about YouTube influencers.' },
]

/** Every entry is a fact from the resume or the old portfolio. Nothing here is a rating or a guess. */
export const achievements = [
  { title: 'Top of the pile', text: 'Selected from 200+ candidates at Banao Technologies.' },
  { title: 'Agent smith', text: 'Shipped 11+ Claude-powered AI features at Accumax.' },
  { title: 'Corpus builder', text: 'Built RAG over a 366K+ document IRS corpus.' },
  { title: 'Form hunter', text: 'Detects 150+ tax form types automatically.' },
  { title: 'Pilot program', text: 'Platform in pilot testing with 10 accounting firms.' },
  { title: 'Model factory', text: 'Built and tuned 11 ML models at SynapseHealthTech.' },
  { title: 'Package published', text: 'Released an image difference detection library on PyPI.' },
  { title: 'Simulations cleared', text: 'Completed 4 Forage job simulations: Cognizant, BCG X, TATA and Accenture.' },
  { title: 'Scholar', text: 'MCA in Artificial Intelligence with a CGPA of 8.9/10.' },
]

export const education = [
  {
    degree: 'MCA in Artificial Intelligence',
    school: 'Jain (Deemed-to-be University)',
    where: 'Online · Bangalore',
    score: 'CGPA 8.9/10',
    period: 'Jul 2023 – Jul 2025',
  },
  {
    degree: 'BCA in Data Science',
    school: 'Institute of Technology and Science',
    where: 'Ghaziabad',
    score: 'CGPA 8.0/10',
    period: 'Jul 2019 – May 2022',
  },
]

export const courses = {
  title: 'Full Stack Data Science',
  period: '2022 – 2024 · Online',
  providers: ['iNeuron', 'Applied Roots', 'CampusX', 'YouTube (self-study)'],
}
