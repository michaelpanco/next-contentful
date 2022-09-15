export async function loadDataLists() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(baseUrl + '/api/contentful/listData');
    const data = await res.json();

    return data;
}
