function wordCountMap(str) {
  let words = str.split(" ");
  let wordCount = {};
  words.forEach((w) => {
    wordCount[w] = (wordCount[w] || 0) + 1;
  });
  return wordCount;
}

function addWordsToDictionary(wordCountmap, dict) {
  for (let key in wordCountmap) {
    dict[key] = true;
  }
}

function wordMapToVector(map, dict) {
  let wordCountVector = [];
  for (let term in dict) {
    wordCountVector.push(map[term] || 0);
  }
  return wordCountVector;
}

function dotProduct(vecA, vecB) {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

function magnitude(vec) {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(vecA, vecB) {
  return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

function textCosineSimilarity(txtA, txtB) {
  const wordCountA = wordCountMap(txtA);
  const wordCountB = wordCountMap(txtB);
  let dict = {};
  addWordsToDictionary(wordCountA, dict);
  addWordsToDictionary(wordCountB, dict);
  const vectorA = wordMapToVector(wordCountA, dict);
  const vectorB = wordMapToVector(wordCountB, dict);
  return cosineSimilarity(vectorA, vectorB);
}

function object(id_user, ques) {
  this.id_user = id_user;
  this.ques = ques;
}

function compare(a, b) {
  return b.probability - a.probability;
}

function recommendQues(prefix_question, current_question) {
  let prob = [];
  for (const eachUser in prefix_question) {
    prob.push({
      index: prefix_question[eachUser].id_user,
      probability:
        textCosineSimilarity(current_question, prefix_question[eachUser].ques) *
        100,
    });
  }
  return prob.sort(compare).slice(0, 9);
}

export default function sortSearchResponse(questions, search) {
  const _questions = [];
  questions.map((question) =>
    _questions.push(new object(question?._id, question?.content))
  );
  const result = recommendQues(_questions, search);
  console.log(result);
  return result;
}
//༼ つ ◕3◕ ༽つ Trí Dũng ☜(ﾟヮﾟ☜)
