import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Para el selector de nivel de estudios
import { datosFamiliaresStyles } from '../styles/datosFamiliaresStyles'; // Asegúrate de tener este archivo

const DatosFamiliaresScreen = ({ navigation }) => {
    const [nombreMadre, setNombreMadre] = useState('');
    const [edadMadre, setEdadMadre] = useState('');
    const [ocupacionMadre, setOcupacionMadre] = useState('');
    const [nivelEstudioMadre, setNivelEstudioMadre] = useState('');
    const [residenciaMadre, setResidenciaMadre] = useState('');
    const [direccionActualMadre, setDireccionActualMadre] = useState('');
    const [telefonoMadre, setTelefonoMadre] = useState('');
    const [conyugueMadre, setConyugueMadre] = useState('');

    // Estado para el padre
    const [nombrePadre, setNombrePadre] = useState('');
    const [edadPadre, setEdadPadre] = useState('');
    const [ocupacionPadre, setOcupacionPadre] = useState('');
    const [nivelEstudioPadre, setNivelEstudioPadre] = useState('');
    const [residenciaPadre, setResidenciaPadre] = useState('');
    const [direccionActualPadre, setDireccionActualPadre] = useState('');
    const [telefonoPadre, setTelefonoPadre] = useState('');
    const [conyuguePadre, setConyuguePadre] = useState('');

    // Estado para pareja
    const [nombrePareja, setNombrePareja] = useState('');
    const [edadPareja, setEdadPareja] = useState('');
    const [ocupacionPareja, setOcupacionPareja] = useState('');
    const [nivelEstudioPareja, setNivelEstudioPareja] = useState('');
    const [residenciaPareja, setResidenciaPareja] = useState('');
    const [direccionActualPareja, setDireccionActualPareja] = useState('');
    const [telefonoPareja, setTelefonoPareja] = useState('');
    const [conyuguePareja, setConyuguePareja] = useState('');



    // Estado para los hermanos
    const [hermanos, setHermanos] = useState([]);

    const handleAddHermano = () => {
        setHermanos([
            ...hermanos,
            {
                nombre: '',
                edad: '',
                ocupacion: '',
                nivelEstudio: '',
                residencia: '',
                direccionActual: '',
                telefono: '',
                conyugue: ''
            }
        ]);
    };

    const handleRemoveHermano = (index) => {
        setHermanos(hermanos.filter((_, i) => i !== index));
    };

    const handleHermanoChange = (index, field, value) => {
        const updatedHermanos = [...hermanos];
        updatedHermanos[index][field] = value;
        setHermanos(updatedHermanos);
    };

    const [hijos, setHijos] = useState([]);

    const agregarHijo = () => {
        setHijos([...hijos, {
            nombre: '',
            edad: '',
            ocupacion: '',
            nivelEstudio: '',
            residencia: '',
            direccionActual: '',
            telefono: '',
        }]);
    };
    const eliminarHijo = (index) => {
        const nuevosHijos = [...hijos];
        nuevosHijos.splice(index, 1);
        setHijos(nuevosHijos);
    };


    const actualizarHijo = (index, campo, valor) => {
        const nuevosHijos = [...hijos];
        nuevosHijos[index][campo] = valor;
        setHijos(nuevosHijos);
    };



    // Manejar el envío de los datos o navegación
    const handleSubmit = () => {
        // Lógica para manejar datos
        console.log('Nombre de la Madre:', nombreMadre);
        console.log('Edad de la Madre:', edadMadre);
        console.log('Ocupación de la Madre:', ocupacionMadre);
        console.log('Nivel de Estudios de la Madre:', nivelEstudioMadre);
        console.log('Sitio de Residencia de la Madre:', residenciaMadre);
        console.log('Dirección Actual de la Madre:', direccionActualMadre);
        console.log('Teléfono de la Madre:', telefonoMadre);
        console.log('Cónyuge o Pareja Actual de la Madre:', conyugueMadre);

        console.log('Nombre del Padre:', nombrePadre);
        console.log('Edad del Padre:', edadPadre);
        console.log('Ocupación del Padre:', ocupacionPadre);
        console.log('Nivel de Estudios del Padre:', nivelEstudioPadre);
        console.log('Sitio de Residencia del Padre:', residenciaPadre);
        console.log('Dirección Actual del Padre:', direccionActualPadre);
        console.log('Teléfono del Padre:', telefonoPadre);
        console.log('Cónyuge o Pareja Actual del Padre:', conyuguePadre);

        hermanos.forEach((hermano, index) => {
            console.log(`Datos del Hermano ${index + 1}:`);
            console.log('Nombre:', hermano.nombre);
            console.log('Edad:', hermano.edad);
            console.log('Ocupación:', hermano.ocupacion);
            console.log('Nivel de Estudios:', hermano.nivelEstudio);
            console.log('Sitio de Residencia:', hermano.residencia);
            console.log('Dirección Actual:', hermano.direccionActual);
            console.log('Teléfono:', hermano.telefono);
            console.log('Cónyuge o Pareja Actual:', hermano.conyugue);
        });
        // Aquí puedes agregar lógica para mover a la siguiente sección o enviar datos
    };

    return (
        <ScrollView contentContainerStyle={datosFamiliaresStyles.container}>
            <Text style={datosFamiliaresStyles.header}>Datos de la Madre</Text>

            {/* Campos de la Madre */}
            <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={nombreMadre}
                onChangeText={setNombreMadre}
                placeholder="Nombre"
            />

            <Text style={datosFamiliaresStyles.label}>Edad:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                keyboardType='numeric'
                value={edadMadre}
                onChangeText={setEdadMadre}
                placeholder="Edad"
            />

            <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={ocupacionMadre}
                onChangeText={setOcupacionMadre}
                placeholder="Ocupación"
            />

            <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
            <Picker
                selectedValue={nivelEstudioMadre}
                style={datosFamiliaresStyles.picker}
                onValueChange={(itemValue) => setNivelEstudioMadre(itemValue)}
            >
                <Picker.Item label="Seleccione" value="" />
                <Picker.Item label="Primaria" value="Primaria" />
                <Picker.Item label="Secundaria" value="Secundaria" />
                <Picker.Item label="Técnico" value="Técnico" />
                <Picker.Item label="Profesional" value="Profesional" />
                <Picker.Item label="Posgrado" value="Posgrado" />
            </Picker>

            <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={residenciaMadre}
                onChangeText={setResidenciaMadre}
                placeholder="Sitio de Residencia"
            />

            <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={direccionActualMadre}
                onChangeText={setDireccionActualMadre}
                placeholder="Dirección actual"
            />

            <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                keyboardType='phone-pad'
                value={telefonoMadre}
                onChangeText={setTelefonoMadre}
                placeholder="Telefono"
            />

            <Text style={datosFamiliaresStyles.label}>Cónyuge o Pareja Actual:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={conyugueMadre}
                onChangeText={setConyugueMadre}
                placeholder="Cónyugue o pareja actual"
            />

            <Text style={datosFamiliaresStyles.header}>Datos del Padre</Text>

            {/* Campos del Padre */}
            <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={nombrePadre}
                onChangeText={setNombrePadre}
                placeholder="Nombre"
            />

            <Text style={datosFamiliaresStyles.label}>Edad:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                keyboardType='numeric'
                value={edadPadre}
                onChangeText={setEdadPadre}
                placeholder="Edad"
            />

            <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={ocupacionPadre}
                onChangeText={setOcupacionPadre}
                placeholder="Ocupación"
            />

            <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
            <Picker
                selectedValue={nivelEstudioPadre}
                style={datosFamiliaresStyles.picker}
                onValueChange={(itemValue) => setNivelEstudioPadre(itemValue)}
            >
                <Picker.Item label="Seleccione" value="" />
                <Picker.Item label="Primaria" value="Primaria" />
                <Picker.Item label="Secundaria" value="Secundaria" />
                <Picker.Item label="Técnico" value="Técnico" />
                <Picker.Item label="Profesional" value="Profesional" />
                <Picker.Item label="Posgrado" value="Posgrado" />
            </Picker>

            <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={residenciaPadre}
                onChangeText={setResidenciaPadre}
                placeholder="Sitio de Residencia"
            />

            <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={direccionActualPadre}
                onChangeText={setDireccionActualPadre}
                placeholder="Dirección actual"
            />

            <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                keyboardType='phone-pad'
                value={telefonoPadre}
                onChangeText={setTelefonoPadre}
                placeholder="Teléfono"
            />

            <Text style={datosFamiliaresStyles.label}>Cónyuge o Pareja Actual:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={conyuguePadre}
                onChangeText={setConyuguePadre}
                placeholder="Cónyugue o pareja actual"
            />

            <Text style={datosFamiliaresStyles.header}>Datos de los Hermanos</Text>

            {/* Datos de los Hermanos */}
            {hermanos.map((hermano, index) => (
                <View key={index} style={datosFamiliaresStyles.hermanoContainer}>                    

                    <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hermano.nombre}
                        onChangeText={(value) => handleHermanoChange(index, 'nombre', value)}
                        placeholder="Nombre"
                    />

                    <Text style={datosFamiliaresStyles.label}>Edad:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        keyboardType='numeric'
                        value={hermano.edad}
                        onChangeText={(value) => handleHermanoChange(index, 'edad', value)}
                        placeholder="Edad"
                    />

                    <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hermano.ocupacion}
                        onChangeText={(value) => handleHermanoChange(index, 'ocupacion', value)}
                        placeholder="Ocupación"
                    />

                    <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
                    <Picker
                        selectedValue={hermano.nivelEstudio}
                        style={datosFamiliaresStyles.picker}
                        onValueChange={(value) => handleHermanoChange(index, 'nivelEstudio', value)}
                    >
                        <Picker.Item label="Seleccione" value="" />
                        <Picker.Item label="Primaria" value="Primaria" />
                        <Picker.Item label="Secundaria" value="Secundaria" />
                        <Picker.Item label="Técnico" value="Técnico" />
                        <Picker.Item label="Profesional" value="Profesional" />
                        <Picker.Item label="Posgrado" value="Posgrado" />
                    </Picker>

                    <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hermano.residencia}
                        onChangeText={(value) => handleHermanoChange(index, 'residencia', value)}
                        placeholder="Sitio de Residencia"
                    />

                    <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hermano.direccionActual}
                        onChangeText={(value) => handleHermanoChange(index, 'direccionActual', value)}
                        placeholder="Dirección Actual"
                    />

                    <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        keyboardType='phone-pad'
                        value={hermano.telefono}
                        onChangeText={(value) => handleHermanoChange(index, 'telefono', value)}
                        placeholder="Teléfono"
                    />

                    <Text style={datosFamiliaresStyles.label}>Cónyuge o Pareja Actual:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hermano.conyugue}
                        onChangeText={(value) => handleHermanoChange(index, 'conyugue', value)}
                        placeholder="Cónyuge o Pareja Actual"
                    />

                    <TouchableOpacity
                        style={datosFamiliaresStyles.removeButton}
                        onPress={() => handleRemoveHermano(index)}
                    >
                        <Text style={datosFamiliaresStyles.removeButtonText}>Eliminar Hermano</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity
                style={datosFamiliaresStyles.addButton}
                onPress={handleAddHermano}
            >
                <Text style={datosFamiliaresStyles.addButtonText}>Agregar Hermano</Text>
            </TouchableOpacity>

            <Text style={datosFamiliaresStyles.header}>Datos de la Pareja o Cónyuge</Text>

            <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={nombrePareja}
                onChangeText={setNombrePareja}
                placeholder="Nombre"
            />

            <Text style={datosFamiliaresStyles.label}>Edad:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                keyboardType='numeric'
                value={edadPareja}
                onChangeText={setEdadPareja}
                placeholder="Edad"
            />

            <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={ocupacionPareja}
                onChangeText={setOcupacionPareja}
                placeholder="Ocupación"
            />

            <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
            <Picker
                selectedValue={nivelEstudioPareja}
                style={datosFamiliaresStyles.picker}
                onValueChange={setNivelEstudioPareja}
            >
                <Picker.Item label="Seleccione" value="" />
                <Picker.Item label="Primaria" value="Primaria" />
                <Picker.Item label="Secundaria" value="Secundaria" />
                <Picker.Item label="Técnico" value="Técnico" />
                <Picker.Item label="Profesional" value="Profesional" />
                <Picker.Item label="Posgrado" value="Posgrado" />
            </Picker>

            <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={residenciaPareja}
                onChangeText={setResidenciaPareja}
                placeholder="Sitio de Residencia"
            />

            <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={direccionActualPareja}
                onChangeText={setDireccionActualPareja}
                placeholder="Dirección Actual"
            />

            <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                keyboardType='phone-pad'
                value={telefonoPareja}
                onChangeText={setTelefonoPareja}
                placeholder="Teléfono"
            />

            <Text style={datosFamiliaresStyles.label}>Estado actual de la relación</Text>
            <TextInput
                style={datosFamiliaresStyles.input}
                value={conyuguePareja}
                onChangeText={setConyuguePareja}
                placeholder="Estado actual de la relación"
            />
            <Text style={datosFamiliaresStyles.header}>Datos de los Hijos</Text>

            {hijos.map((hijo, index) => (
                <View key={index} style={datosFamiliaresStyles.hijoContainer}>
                    <Text style={datosFamiliaresStyles.label}>Nombre:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hijo.nombre}
                        onChangeText={(valor) => actualizarHijo(index, 'nombre', valor)}
                        placeholder="Nombre"                        
                    />

                    <Text style={datosFamiliaresStyles.label}>Edad:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        keyboardType='numeric'
                        value={hijo.edad}
                        onChangeText={(valor) => actualizarHijo(index, 'edad', valor)}
                        placeholder="Edad"
                    />

                    <Text style={datosFamiliaresStyles.label}>Ocupación:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hijo.ocupacion}
                        onChangeText={(valor) => actualizarHijo(index, 'ocupacion', valor)}
                        placeholder="Ocupación"
                    />

                    <Text style={datosFamiliaresStyles.label}>Nivel de Estudios:</Text>
                    
                    <Picker
                        selectedValue={hijo.nivelEstudio}
                        style={datosFamiliaresStyles.picker}
                        onValueChange={(valor) => actualizarHijo(index, 'nivelEstudio', valor)}
                    >
                        <Picker.Item label="Seleccione" value="" />
                        <Picker.Item label="Primaria" value="Primaria" />
                        <Picker.Item label="Secundaria" value="Secundaria" />
                        <Picker.Item label="Técnico" value="Técnico" />
                        <Picker.Item label="Profesional" value="Profesional" />
                        <Picker.Item label="Posgrado" value="Posgrado" />
                    </Picker>

                    <Text style={datosFamiliaresStyles.label}>Sitio de Residencia:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hijo.residencia}
                        onChangeText={(valor) => actualizarHijo(index, 'residencia', valor)}
                        placeholder="Sitio de residencia"
                    />

                    <Text style={datosFamiliaresStyles.label}>Dirección Actual:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        value={hijo.direccionActual}
                        onChangeText={(valor) => actualizarHijo(index, 'direccionActual', valor)}
                        placeholder="Dirección Actual"
                    />

                    <Text style={datosFamiliaresStyles.label}>Teléfono:</Text>
                    <TextInput
                        style={datosFamiliaresStyles.input}
                        keyboardType='phone-pad'
                        value={hijo.telefono}
                        onChangeText={(valor) => actualizarHijo(index, 'telefono', valor)}
                        placeholder="Teléfono"
                    />

                    <TouchableOpacity
                        style={datosFamiliaresStyles.deleteButton}
                        onPress={() => eliminarHijo(index)}
                    >
                        <Text style={datosFamiliaresStyles.deleteButtonText}>Eliminar Hijo</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <TouchableOpacity style={datosFamiliaresStyles.addButton} onPress={agregarHijo}>
                <Text style={datosFamiliaresStyles.addButtonText}>Agregar Hijo</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={datosFamiliaresStyles.button}
                onPress={() => navigation.navigate('DatosInternos')}
            >
                <Text style={datosFamiliaresStyles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default DatosFamiliaresScreen;

