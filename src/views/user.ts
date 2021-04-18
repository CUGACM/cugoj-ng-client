export async function currentUser() {
    let res = await fetch("/api/User/WhoAmI").then(x => x.json());
    return res.user;
}