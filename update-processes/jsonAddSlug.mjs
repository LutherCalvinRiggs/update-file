export default (data) => {
  return data.map((entry) => {
    function toKebabCase(str) {
      return str
        .toLowerCase()
        .replaceAll("&", "and")
        .replaceAll(/[^\w\s]+/g, "") // all non-word characters, aka punctuation
        .replaceAll(" ", "-");
    }

    const title = toKebabCase(entry.recipeTitle);
    const author = toKebabCase(entry.cookbook.author);
    const slug = `${title}_${author}`;

    return { ...entry, slug };
  });
};
