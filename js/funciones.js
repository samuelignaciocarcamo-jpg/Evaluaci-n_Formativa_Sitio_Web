// Codígo JavaScript aqui
      function apagarAmpolleta() {
        document.getElementById("apagada").style.display = "block";
        document.getElementById("encendida").style.display = "none";
      }

      function encenderAmpolleta() {
        document.getElementById("encendida").style.display = "block";
        document.getElementById("apagada").style.display = "none";
      }

  function sumaDosNumeros(){
        let num1 = parseFloat(document.getElementById("num1").value);
        let num2 = parseFloat(document.getElementById("num2").value);
        let suma = num1 + num2;
        document.getElementById("resultado").value = suma; // Mostrar el resultado en el campo de texto
    }
    function restaDosNumeros(){
        let num1 = parseFloat(document.getElementById("num1").value);
        let num2 = parseFloat(document.getElementById("num2").value);
        let resta = num1 - num2;
        document.getElementById("resultado").value = resta; // Mostrar el resultado en el campo de texto
    }

    $(document).ready(function() {
        $("#btnSuma").click(function() {
            sumaDosNumeros();
        });
  })