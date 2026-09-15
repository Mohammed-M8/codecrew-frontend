function getRandomColor() {
    const colors = [
        "#5190F5",
        "#8E7CFF",
        "#F5A623",
        "#4CAF7D",
        "#E76F51",
        "#D65DB1",
        "#00A8A8"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}
export default getRandomColor;