document.getElementById("text-input").addEventListener("input", function () {
  if (this.value.includes(" ")) {
    this.value = this.value.replaceAll(" ", "");
  }
  if (this.value === "") {
    document.getElementById("result").innerText = "Result";
    return;
  }

  const condition = this.value === this.value.split("").reverse().join("");

  document.getElementById("result").innerText = condition;
});
