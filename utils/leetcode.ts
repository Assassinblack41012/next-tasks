export async function getEnDailyQuestion(): any {
  const dailyQuestionPayload = {
    query: `query questionOfToday {
            activeDailyCodingChallengeQuestion {
                date
                link
                question {
                    frontendQuestionId: questionFrontendId
                    titleSlug
                }
            }
        } `,
    variables: {},
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(dailyQuestionPayload),
  };
  let response = await fetch(process.env.LEETCODE_EN_HOST + "/graphql", options);
  if (response.status == 200) {
    let data = await response.json();
    return data;
  } else return response.statusText;
}

export async function getQuestionDetails(questionTitleSlug: string) {
  const detailsPayload = {
    operationName: "questionData",
    query: `query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                questionFrontendId
                title
                titleSlug
                content
                translatedTitle
                translatedContent
                difficulty
                topicTags {
                    name
                    slug
                    translatedName
                    __typename
                }
                __typename
            }
        }`,
    variables: {
      titleSlug: questionTitleSlug,
    },
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(detailsPayload),
  };
  let response = await fetch(process.env.LEETCODE_EN_HOST + "/graphql", options);
  if (response.status == 200) {
    let data = await response.json();
    return data;
  } else return response.statusText;
}

