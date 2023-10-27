<script lang="ts">
    import { firebaseConfig } from "$lib/firebase";
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    import { collectionStore } from "sveltefire";

    interface Quiz {
        question?: string;
        sans?: string;
    }

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const quizs = collectionStore<Quiz[]>(firestore, "quiz");

  
</script>

<div class="join join-vertical">
    <form method="POST" action="?/create">
        <button class="btn btn-outline btn-primary" type="submit">create</button>
    </form>
    <div class="divider"></div>
{#each $quizs as quiz}

    <div class="card w-96 bg-base-100 shadow-xl join-item">
        <div class="card-body">
            <p>{quiz.question}</p>
            <h2 class="card-title">Question</h2>
            <form method="POST" action="?/submission">
            <input type="hidden" name="id" value="{quiz.id}">
            <div class="card-actions justify-end">
                <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                    name="sans" 
                    value="{quiz.sans}"
                />
                <button class="btn" type="submit">submit</button>
            </div>
        </form>
        </div>
    </div>
    <div class="divider"></div>
{/each}
</div>

