#!/bin/sh

data=$(grep -o '\s.*' q.txt | cut -c2- |jq -R)
question='{"question_text": '"$(echo "$data" | head -n 1)"',"answers": ['"$(echo "$data" | tail --lines=+2 | sed -e 's/$/,/')"

question=${question::-1}
question="${question}]}"

question=$(echo $question | jq ".correct_answer += $2" | jq '.type += "ORD"' | jq '.additional_resources += null' | jq ".test += \"$1\"")

json=$(jq ". += [$question]" public/questions.json)

echo $json | jq -M --indent 4 . > public/questions.json
