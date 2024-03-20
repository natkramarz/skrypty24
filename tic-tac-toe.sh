#!/usr/bin/env bash

fields=(" " " " " " " " " " " " " " " " " ")

display_board() {
    for i in "${!fields[@]}"; do
        printf '|%s' "${fields[$i]}"
        if [[ $(( $(($i+1)) % 3 )) -eq 0 ]]; then
            printf '|\n' 
        fi
    done
}

winning_positions=("012" "345" "678" "036" "147" "258" "048" "246")
has_game_ended() {
    for position in "${winning_positions[@]}"; do
        i="${position:0:1}"
        j="${position:1:1}"
        k="${position:2:1}"
    
        if [[ "${fields[$i]}" == "${fields[$j]}" && "${fields[$j]}" == "${fields[$k]}" && ( "${fields[$i]}" == "X" || "${fields[$i]}" == "O" ) ]]; then
            echo "1" 
            return
        fi
    done

    echo "0"
    return
}

row=0
column=0


is_x_turn=1

while [ "$(has_game_ended)" -eq 0 ]; do
    display_board
    read -p "Row (1, 2, or 3): " row
    if [[ ! $row =~ ^[1-3]$ ]]; then
        echo "Invalid input. Please enter 1, 2, or 3."
        continue
    fi
    read -p "Column (1, 2, or 3): " column
    if [[ ! $column =~ ^[1-3]$ ]]; then
        echo "Invalid input. Please enter 1, 2, or 3."
        continue
    fi
    index=$(( ( ($row - 1) * 3) + ($column - 1) ))
    if [[ ${fields[$index]} == "X" || ${fields[$index]} == "O" ]]; then
        echo "This position is already taken. Please choose another."
    else
        fields[$index]=$(if [ $is_x_turn -eq 1 ]; then echo "X"; else echo "O"; fi)
        is_x_turn=$((1 - $is_x_turn))
    fi
done


echo "Player $((1 - $is_x_turn)) has won!"
display_board