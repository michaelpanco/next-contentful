export async function loadPageDetails(id) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(baseUrl + `/api/contentful/details/${id}`);
    const data = await res.json();

    return data;
}
