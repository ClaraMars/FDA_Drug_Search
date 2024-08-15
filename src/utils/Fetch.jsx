export async function getDrugsResults(url, setResults, setIsLoading, setError) {
  try {
    setIsLoading(true);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la petición.");
    const data = await response.json();
    setResults({
      data: data.results,
      totalResults: data.meta.results.total,
    });
  } catch (error) {
    setError(true);
  } finally {
    setIsLoading(false);
  }
}
