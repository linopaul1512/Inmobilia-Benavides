async function loadProfile() {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const id = usuarioActivo?.id;

    if (!id) {
        alert("Debes iniciar sesión.");
        window.location.href = "../Login/index.html";
        return;
    }

    try {
        const response = await fetch(`http://localhost/apitest/controller/back.php?oper=showProfile&id=${id}`);
        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            alert("Perfil no encontrado.");
            return;
        }

        const user = data[0];
        document.getElementById("nombre").value = user.nombre;
        document.getElementById("apellido").value = user.apellido;
        document.getElementById("fechaNacimiento").value = user.fecha_nac;
        document.getElementById("correo").value = user.email;
        document.getElementById("telefono").value = user.cedula;
    } catch (error) {
        console.error("Error cargando perfil:", error);
    }
}

document.getElementById("userProfile").addEventListener("submit", async function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fecha_nac = document.getElementById("fechaNacimiento").value.trim();
    const cedula = document.getElementById("telefono").value.trim();

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const id = usuarioActivo?.id;

    if (!id) {
        alert("Debes iniciar sesión para actualizar tu perfil.");
        return;
    }

    if (!nombre || !apellido || !fecha_nac || !cedula) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const params = new URLSearchParams({ id, nombre, apellido, cedula, fecha_nac });

    try {
        const response = await fetch(`http://localhost/apitest/controller/back.php?oper=updateProfile&${params.toString()}`, {
            method: "GET"
        });

        const data = await response.json();

        if (data.code === "ok") {
            alert(data.message);
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        alert("Error al conectar con el servidor.");
    }
});

document.addEventListener("DOMContentLoaded", loadProfile);
