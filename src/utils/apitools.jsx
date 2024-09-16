let token=localStorage.getItem('token')
export const headers = {
    "Content-Type": "multipart/form-data",
    Authorization:`Bearer ${token}`,
  };