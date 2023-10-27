/** @type {import('./$types').Actions} */
import { firebaseConfig } from "$lib/firebase";
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

interface Quiz {
    question?: string;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const actions = {
    submission: async ({ cookies, request }) => {
        const data = await request.formData();
        const id: string = data.get('id')?.toString();
        const sans = data.get('sans');

        await updateDoc(doc(firestore, "quiz", id), {
            sans
        });

    },
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        const sans = data.get('sans');
        const n1 = getRandomInt(50);
        const n2 = getRandomInt(20);

        await addDoc(collection(firestore, "quiz"), {
            question:  n1+"+"
            + n2 + "= ?",
            cans: n1 + n2,
            sans: ""
        });

    },
};