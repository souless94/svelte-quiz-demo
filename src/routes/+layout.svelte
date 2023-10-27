<script lang="ts">
    import "../app.css";
    import { FirebaseApp } from "sveltefire";
    import { initializeApp } from "firebase/app";
    import { getFirestore } from "firebase/firestore";
    import { firebaseConfig } from "$lib/firebase";
    import { SignedIn, SignedOut, Doc, Collection } from "sveltefire";
    import {
        getAuth,
        signInWithPopup,
        GoogleAuthProvider,
    } from "firebase/auth";

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
</script>

<div class="min-h-screen flex flex-col bg-base-200">
    <FirebaseApp {auth} {firestore}>
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <a class="btn btn-ghost normal-case text-xl" href="/">daisyUI</a
                >
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-2">
                    <li>
                        <a href="./quiz" class="normal-case text-xl">Quiz</a>
                    </li>
                </ul>
            </div>
            <div class="navbar-end lg:flex">
                <SignedIn let:user let:signOut>
                    <p>Hello {user.uid}</p>
                    
                    <button class="btn btn-outline btn-primary" on:click={signOut}>Sign Out</button>
                </SignedIn>
                <SignedOut let:auth>
                    <button on:click={() => signInWithPopup(auth, provider)}
                        ><img src="googlebutton.png" alt="google Sign In"></button
                    >
                </SignedOut>
            </div>
        </div>
        <div>
            <div class="h-screen flex items-center justify-center">
            <SignedIn>
                <slot />
            </SignedIn>
        </div>
            <SignedOut let:auth>
                <div class="hero min-h-screen bg-base-200">
                    <div class="hero-content text-center">
                      <div class="max-w-md">
                        <h1 class="text-5xl font-bold">Hello there</h1>
                        <p class="py-6">This is a Quiz App</p>
                        <p class="py-6">Please sign in before taking the quiz</p>
                      </div>
                    </div>
                  </div>
            </SignedOut>
        </div>
    </FirebaseApp>
</div>
