export const fetchResp = (resp) => {
    if (resp.ok) {
        return resp.json();
    }
    throw new Error("Server error")
}