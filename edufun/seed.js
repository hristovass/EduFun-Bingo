require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const questionSchema = new mongoose.Schema({
    category: { type: String, required: true },
    question: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    answers: { type: [String], required: true },
});

const Question = mongoose.model('Question', questionSchema);

const questions = [
    {
        category: 'programiranje',
        question: 'Kaj pomeni kratica OOP?',
        correctAnswer: 'Objektno usmerjeno programiranje',
        answers: ['Operacijski odzivni protokol', 'Objektno usmerjeno programiranje', 'Optimalna obdelava podatkov', 'Osnovni okvir programiranja'],
    },
    {
        category: 'programiranje',
        question: 'Kateri je pravilni nacin deklaracije konstante v JavaScript?',
        correctAnswer: 'const PI = 3.14;',
        answers: ['constant PI = 3.14;', 'const PI = 3.14;', 'let PI = 3.14;', 'var const PI = 3.14;'],
    },
    {
        category: 'programiranje',
        question: 'Kaj vrne izraz 2 + "2" v JavaScript?',
        correctAnswer: '"22"',
        answers: ['4', '"22"', 'NaN', 'Napaka'],
    },
    {
        category: 'programiranje',
        question: 'Katera struktura podatkov deluje po nacelu LIFO?',
        correctAnswer: 'Sklad (stack)',
        answers: ['Vrsta (queue)', 'Sklad (stack)', 'Drevo', 'Seznam'],
    },
    {
        category: 'programiranje',
        question: 'Kaj pomeni HTTP statusna koda 404?',
        correctAnswer: 'Ni najdeno',
        answers: ['Dostop zavrnjen', 'Ni najdeno', 'Notranja napaka streznika', 'Ustvarjeno'],
    },
    {
        category: 'programiranje',
        question: 'Kateri ukaz izpise besedilo v konzolo v JavaScript?',
        correctAnswer: 'console.log("pozdrav");',
        answers: ['print("pozdrav")', 'echo "pozdrav"', 'console.log("pozdrav");', 'printf("pozdrav")'],
    },
    {
        category: 'programiranje',
        question: 'Kaj je rezultat 5 === "5" v JavaScript?',
        correctAnswer: 'false',
        answers: ['true', 'false', 'NaN', 'Napaka'],
    },
    {
        category: 'programiranje',
        question: 'Kateri tip podatka predstavlja true/false?',
        correctAnswer: 'Boolean',
        answers: ['String', 'Number', 'Boolean', 'Object'],
    },
    {
        category: 'programiranje',
        question: 'Kaj pomeni kratica IDE?',
        correctAnswer: 'Integrated Development Environment',
        answers: ['Internet Development Engine', 'Integrated Development Environment', 'Internal Debug Environment', 'Input Data Encoder'],
    },
    {
        category: 'programiranje',
        question: 'Kateri operator zdruzuje nize v JavaScript?',
        correctAnswer: '+',
        answers: ['+', '-', '*', '/'],
    },
    {
        category: 'algoritmi',
        question: 'Katera casovna zahtevnost opisuje binarno iskanje?',
        correctAnswer: 'O(log n)',
        answers: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'],
    },
    {
        category: 'algoritmi',
        question: 'Kateri algoritem vedno izbere lokalno najboljs o izbiro?',
        correctAnswer: 'Pozresni algoritem (greedy)',
        answers: ['Delitev in vladaj', 'Pozresni algoritem (greedy)', 'Dinamicno programiranje', 'Brute force'],
    },
    {
        category: 'algoritmi',
        question: 'Katera podatkovna struktura je najprimernejsa za implementacijo prednostne vrste?',
        correctAnswer: 'Binarna kopica (heap)',
        answers: ['Seznam', 'Sklad', 'Binarna kopica (heap)', 'Matrika'],
    },
    {
        category: 'algoritmi',
        question: 'Kateri algoritem je stabilen?',
        correctAnswer: 'Merge sort',
        answers: ['Quick sort', 'Heap sort', 'Merge sort', 'Selection sort'],
    },
    {
        category: 'algoritmi',
        question: 'Kaj je osnovna ideja dinamicnega programiranja?',
        correctAnswer: 'Resevanje prekrivajocih se podproblemov in shranjevanje resitev',
        answers: ['Nakljucno iskanje', 'Delitev problema na neodvisne dele', 'Resevanje prekrivajocih se podproblemov in shranjevanje resitev', 'Vedno izberi najvecji element'],
    },
    {
        category: 'algoritmi',
        question: 'Katera je povprecna casovna zahtevnost quick sorta?',
        correctAnswer: 'O(n log n)',
        answers: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
    },
    {
        category: 'algoritmi',
        question: 'Kateri algoritem uporablja vrsto (queue)?',
        correctAnswer: 'BFS (sirinsko iskanje)',
        answers: ['DFS (globinsko iskanje)', 'BFS (sirinsko iskanje)', 'Dijkstra', 'Merge sort'],
    },
    {
        category: 'algoritmi',
        question: 'Kaj racuna Dijkstra algoritem?',
        correctAnswer: 'Najkrajse poti v utez en em grafu',
        answers: ['Najdaljse poti', 'Najkrajse poti v utez en em grafu', 'Minimalno vpeto drevo', 'Topolosko urejanje'],
    },
    {
        category: 'algoritmi',
        question: 'Kateri algoritem je primer razvrscanja z vstavljanjem?',
        correctAnswer: 'Insertion sort',
        answers: ['Selection sort', 'Insertion sort', 'Quick sort', 'Heap sort'],
    },
    {
        category: 'algoritmi',
        question: 'Kaksna je casovna zahtevnost linearnega iskanja?',
        correctAnswer: 'O(n)',
        answers: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    },
    {
        category: 'matematika',
        question: 'Koliko je 7 x 8?',
        correctAnswer: '56',
        answers: ['54', '56', '64', '58'],
    },
    {
        category: 'matematika',
        question: 'Katera je vrednost pi zaokrozena na 2 decimalki?',
        correctAnswer: '3.14',
        answers: ['3.12', '3.14', '3.16', '3.18'],
    },
    {
        category: 'matematika',
        question: 'Resi enacbo: 2x + 6 = 14',
        correctAnswer: 'x = 4',
        answers: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    },
    {
        category: 'matematika',
        question: 'Koliksen je obseg kvadrata s stranico 5?',
        correctAnswer: '20',
        answers: ['10', '15', '20', '25'],
    },
    {
        category: 'matematika',
        question: 'Kateri je najvecji skupni delitelj (GCD) stevil 24 in 36?',
        correctAnswer: '12',
        answers: ['6', '12', '18', '24'],
    },
    {
        category: 'matematika',
        question: 'Koliko je 9^2?',
        correctAnswer: '81',
        answers: ['18', '72', '81', '90'],
    },
    {
        category: 'matematika',
        question: 'Priblizna vrednost obsega kroga s polmerom 1 je?',
        correctAnswer: '6.28',
        answers: ['3.14', '6.28', '9.42', '12.56'],
    },
    {
        category: 'matematika',
        question: 'Koliksna je vsota notranjih kotov trikotnika?',
        correctAnswer: '180',
        answers: ['90', '180', '270', '360'],
    },
    {
        category: 'matematika',
        question: 'Nadaljuj zaporedje: 2, 4, 8, 16, ?',
        correctAnswer: '32',
        answers: ['24', '30', '32', '36'],
    },
    {
        category: 'matematika',
        question: 'Koliko je 3/4 kot decimalno stevilo?',
        correctAnswer: '0.75',
        answers: ['0.25', '0.5', '0.75', '1.25'],
    },
    {
        category: 'podatkovne baze',
        question: 'Kaj pomeni SQL?',
        correctAnswer: 'Structured Query Language',
        answers: ['Simple Query Logic', 'Structured Query Language', 'Standard Question List', 'System Query Layer'],
    },
    {
        category: 'podatkovne baze',
        question: 'Katera SQL poizvedba izbere vse stolpce iz tabele users?',
        correctAnswer: 'SELECT * FROM users;',
        answers: ['SELECT users;', 'SELECT * FROM users;', 'GET * users;', 'FETCH users ALL;'],
    },
    {
        category: 'podatkovne baze',
        question: 'Kaj je primarni kljuc (primary key)?',
        correctAnswer: 'Enolicno identificira zapis v tabeli',
        answers: ['Omogoca podvajanje zapisov', 'Enolicno identificira zapis v tabeli', 'Je tuji kljuc', 'Je indeks za pospesitev poizvedb'],
    },
    {
        category: 'podatkovne baze',
        question: 'Katera SQL klavzula se uporablja za filtriranje vrstic?',
        correctAnswer: 'WHERE',
        answers: ['GROUP BY', 'ORDER BY', 'WHERE', 'LIMIT'],
    },
    {
        category: 'podatkovne baze',
        question: 'Kaj je normalizacija?',
        correctAnswer: 'Postopek organizacije podatkov za zmanjsanje redundance',
        answers: ['Postopek sifriranja podatkov', 'Postopek organizacije podatkov za zmanjsanje redundance', 'Postopek brisanja podvojenih tabel', 'Postopek zdruzevanja tabel brez pravil'],
    },
    {
        category: 'podatkovne baze',
        question: 'Kaj naredi SQL ukaz INSERT?',
        correctAnswer: 'Vstavi nov zapis v tabelo',
        answers: ['Posodobi zapis', 'Vstavi nov zapis v tabelo', 'Izbrise zapis', 'Ustvari tabelo'],
    },
    {
        category: 'podatkovne baze',
        question: 'Kaj je tuji kljuc (foreign key)?',
        correctAnswer: 'Sklic na primarni kljuc druge tabele',
        answers: ['Enolicni indeks', 'Sklic na primarni kljuc druge tabele', 'Sifrirano polje', 'Samodejno stetje zapisov'],
    },
    {
        category: 'podatkovne baze',
        question: 'Kaj naredi SQL ukaz JOIN?',
        correctAnswer: 'Zdruzi vrstice iz vec tabel glede na povezave',
        answers: ['Izbrise podatke', 'Zdruzi vrstice iz vec tabel glede na povezave', 'Ustvari novo bazo', 'Spremeni ime tabele'],
    },
    {
        category: 'podatkovne baze',
        question: 'Katera SQL klavzula se uporablja za agregiranje po skupinah?',
        correctAnswer: 'GROUP BY',
        answers: ['WHERE', 'ORDER BY', 'GROUP BY', 'LIMIT'],
    },
    {
        category: 'podatkovne baze',
        question: 'Kaj pomeni ACID?',
        correctAnswer: 'Atomicity, Consistency, Isolation, Durability',
        answers: ['Access, Control, Index, Data', 'Atomicity, Consistency, Isolation, Durability', 'Accuracy, Consistency, Integration, Data', 'Archive, Create, Insert, Delete'],
    },
];

const seedQuestions = async () => {
    await Question.deleteMany({});
    const result = await Question.insertMany(questions);
    console.log(`${result.length} pitanja dodato u bazu`);
    mongoose.connection.close();
};

seedQuestions().catch(err => console.error(err));
