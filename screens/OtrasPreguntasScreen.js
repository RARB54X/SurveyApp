import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../styles/otrasPreguntasStyle";
import { OtherQuestionsRepository } from "../repositories/OtherQuestionsRepository";
import { useSQLiteContext } from "expo-sqlite/next";

const OtrasPreguntasScreen = ({ route, navigation }) => {
  const respondentId = route.params?.respondentId;
  console.log("respondentId", respondentId);
  const db = useSQLiteContext();

  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  const [primerosAños, setPrimerosAños] = useState("");
  const [comoCastigaban, setComoCastigaban] = useState("");
  const [comoPremiaban, setComoPremiaban] = useState("");
  const [queriaSerGrande, setQueriaSerGrande] = useState("");
  const [quiereSerAhora, setQuiereSerAhora] = useState("");
  const [relacionPadre, setRelacionPadre] = useState("");
  const [relacionMadre, setRelacionMadre] = useState("");
  const [relacionHermanos, setRelacionHermanos] = useState("");
  const [parejaEstable, setParejaEstable] = useState("");
  const [tiempoPareja, setTiempoPareja] = useState("");
  const [relacionPareja, setRelacionPareja] = useState("");
  const [primeraRelacionSexual, setPrimeraRelacionSexual] = useState("");
  const [esComoImaginaba, setEsComoImaginaba] = useState("");
  const [demuestraAfecto, setDemuestraAfecto] = useState("");
  const [enamorado, setEnamorado] = useState("");
  const [teme, setTeme] = useState("");
  const [sustoMasGrande, setSustoMasGrande] = useState("");
  const [alegriaMasGrande, setAlegriaMasGrande] = useState("");
  const [respuestaOfensa, setRespuestaOfensa] = useState("");

  const otherQuestionsRepository = new OtherQuestionsRepository(db);

  async function getData() {
    const result = await otherQuestionsRepository.findAll();
    console.log("Formación", result);
  }
  const getOtherQuestionsFields = () => ({
    respondentId,
    livedWithFirst7Years: primerosAños,
    punishmentMethod: comoCastigaban,
    rewardMethod: comoPremiaban,
    childhoodAspiration: queriaSerGrande,
    currentAspiration: quiereSerAhora,
    relationshipWithFather: relacionPadre,
    relationshipWithMother: relacionMadre,
    relationshipWithSiblings: relacionHermanos,
    hasStablePartner: parejaEstable,
    timeWithPartner: tiempoPareja,
    relationshipWithPartner: relacionPareja,
    ageOfFirstSexualRelationship: primeraRelacionSexual,
    currentSituation: esComoImaginaba,
    affectionDemonstration: demuestraAfecto,
    inLove: enamorado,
    fears: teme,
    biggestFear: sustoMasGrande,
    greatestJoy: alegriaMasGrande,
    responseToOffenseOrAttack: respuestaOfensa,
  });

  const handleSubmit = async () => {
    const otherQuestion = await otherQuestionsRepository.findByRespondentId(
      respondentId
    );
    if (otherQuestion) {
      // Actualizar los datos de la otras preguntas
      await otherQuestionsRepository.update({
        ...getOtherQuestionsFields(),
        id: otherQuestion.id,
      });
      if (!otherQuestion) {
        console.error("No se pudo actualizar la otherQuestion.");
        return;
      }
      console.log("otherQuestion actualizado correctamente.");
      navigation.navigate("Inicio");
    } else {
      await otherQuestionsRepository.create(getOtherQuestionsFields());
    }

    // await otherQuestionsRepository.create({
    //   respondentId,
    //   livedWithFirst7Years: primerosAños,
    //   punishmentMethod: comoCastigaban,
    //   rewardMethod: comoPremiaban,
    //   childhoodAspiration: queriaSerGrande,
    //   currentAspiration: quiereSerAhora,
    //   relationshipWithFather: relacionPadre,
    //   relationshipWithMother: relacionMadre,
    //   relationshipWithSiblings: relacionHermanos,
    //   hasStablePartner: parejaEstable,
    //   timeWithPartner: tiempoPareja,
    //   relationshipWithPartner: relacionPareja,
    //   ageOfFirstSexualRelationship: primeraRelacionSexual,
    //   currentSituation: esComoImaginaba,
    //   affectionDemonstration: demuestraAfecto,
    //   inLove: enamorado,
    //   fears: teme,
    //   biggestFear: sustoMasGrande,
    //   greatestJoy: alegriaMasGrande,
    //   responseToOffenseOrAttack: respuestaOfensa,
    // });

    navigation.navigate("Inicio");
  };

  const setOtherQuestionsFields = async (otherQuestions) => {
    setPrimerosAños(otherQuestions.livedWithFirst7Years);
    setComoCastigaban(otherQuestions.punishmentMethod);
    setComoPremiaban(otherQuestions.rewardMethod);
    setQueriaSerGrande(otherQuestions.childhoodAspiration);
    setQuiereSerAhora(otherQuestions.currentAspiration);
    setRelacionPadre(otherQuestions.relationshipWithFather);
    setRelacionMadre(otherQuestions.relationshipWithMother);
    setRelacionHermanos(otherQuestions.relationshipWithSiblings);
    setParejaEstable(otherQuestions.hasStablePartner);
    setTiempoPareja(otherQuestions.timeWithPartner);
    setRelacionPareja(otherQuestions.relationshipWithPartner);
    setPrimeraRelacionSexual(otherQuestions.ageOfFirstSexualRelationship);
    setEsComoImaginaba(otherQuestions.currentSituation);
    setDemuestraAfecto(otherQuestions.affectionDemonstration);
    setEnamorado(otherQuestions.inLove);
    setTeme(otherQuestions.fears);
    setSustoMasGrande(otherQuestions.biggestFear);
    setAlegriaMasGrande(otherQuestions.greatestJoy);
    setRespuestaOfensa(otherQuestions.responseToOffenseOrAttack);
  };
  const loadOtherQuestionsData = async (respondentId) => {
    if (!respondentId) return;

    const otherQuestions = await otherQuestionsRepository.findByRespondentId(
      respondentId
    );
    if (otherQuestions) {
      setOtherQuestionsFields(otherQuestions);
    }
  };
  React.useEffect(() => {
    loadOtherQuestionsData(respondentId);
  }, [respondentId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Otras Preguntas</Text>

      <Text style={styles.label}>
        ¿Con quién vivió durante los primeros 7 años de vida?
      </Text>
      <TextInput
        style={styles.input}
        value={primerosAños}
        onChangeText={setPrimerosAños}
      />

      <Text style={styles.label}>¿Cómo lo castigaban?</Text>
      <TextInput
        style={styles.input}
        value={comoCastigaban}
        onChangeText={setComoCastigaban}
      />

      <Text style={styles.label}>¿Cómo lo premiaban?</Text>
      <TextInput
        style={styles.input}
        value={comoPremiaban}
        onChangeText={setComoPremiaban}
      />

      <Text style={styles.label}>¿Qué quería ser cuando grande?</Text>
      <TextInput
        style={styles.input}
        value={queriaSerGrande}
        onChangeText={setQueriaSerGrande}
      />

      <Text style={styles.label}>¿Qué quiere ser ahora?</Text>
      <TextInput
        style={styles.input}
        value={quiereSerAhora}
        onChangeText={setQuiereSerAhora}
      />

      <Text style={styles.label}>¿Cómo es la relación con su padre?</Text>
      <TextInput
        style={styles.input}
        value={relacionPadre}
        onChangeText={setRelacionPadre}
      />

      <Text style={styles.label}>¿Cómo es la relación con su madre?</Text>
      <TextInput
        style={styles.input}
        value={relacionMadre}
        onChangeText={setRelacionMadre}
      />

      <Text style={styles.label}>¿Cómo es la relación con sus hermanos?</Text>
      <TextInput
        style={styles.input}
        value={relacionHermanos}
        onChangeText={setRelacionHermanos}
      />

      <Text style={styles.label}>¿Tiene pareja estable?</Text>
      <TextInput
        style={styles.input}
        value={parejaEstable}
        onChangeText={setParejaEstable}
      />

      <Text style={styles.label}>¿Cuánto tiempo lleva con su pareja?</Text>
      <TextInput
        style={styles.input}
        value={tiempoPareja}
        onChangeText={setTiempoPareja}
      />

      <Text style={styles.label}>¿Cómo es la relación con su pareja?</Text>
      <TextInput
        style={styles.input}
        value={relacionPareja}
        onChangeText={setRelacionPareja}
      />

      <Text style={styles.label}>
        ¿A qué edad tuvo su primera relación sexual?
      </Text>
      <TextInput
        style={styles.input}
        value={primeraRelacionSexual}
        onChangeText={setPrimeraRelacionSexual}
      />

      <Text style={styles.label}>¿Es aquí como se lo imaginaba?</Text>
      <TextInput
        style={styles.input}
        value={esComoImaginaba}
        onChangeText={setEsComoImaginaba}
      />

      <Text style={styles.label}>¿Cómo le demuestra a alguien afecto?</Text>
      <TextInput
        style={styles.input}
        value={demuestraAfecto}
        onChangeText={setDemuestraAfecto}
      />

      <Text style={styles.label}>¿Está enamorado?</Text>
      <TextInput
        style={styles.input}
        value={enamorado}
        onChangeText={setEnamorado}
      />

      <Text style={styles.label}>¿A qué le teme?</Text>
      <TextInput style={styles.input} value={teme} onChangeText={setTeme} />

      <Text style={styles.label}>
        ¿Cuál ha sido el susto más grande que ha tenido?
      </Text>
      <TextInput
        style={styles.input}
        value={sustoMasGrande}
        onChangeText={setSustoMasGrande}
      />

      <Text style={styles.label}>
        ¿Cuál ha sido la alegría más grande que ha tenido?
      </Text>
      <TextInput
        style={styles.input}
        value={alegriaMasGrande}
        onChangeText={setAlegriaMasGrande}
      />

      <Text style={styles.label}>
        Si alguien (Civil o compañero) lo ofende o lo ataca, ¿qué le hace?
      </Text>
      <TextInput
        style={styles.input}
        value={respuestaOfensa}
        onChangeText={setRespuestaOfensa}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        // onPress={() => navigation.navigate('Inicio')}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OtrasPreguntasScreen;
