#!/usr/bin/env bash

fields=("." "." "." "." "." "." "." "." ".")

display_board() {
    for i in "${!fields[@]}"; do
        if [ "${fields[$i]}" == "." ]; then
            printf '|%s' " "
        else
            printf '|%s' "${fields[$i]}"
        fi 
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
            return 1
        fi
    done

    for field in "${fields[@]}"; do
        if [[ "$field" == "." ]]; then
            return 0
        fi
    done

    return 2
}

save_game() {
    echo "${fields[@]}" > saved_game.txt
    echo "$is_x_turn" >> saved_game.txt
    echo "Game saved successfully."
}

load_game() {
    if [ -f "saved_game.txt" ]; then
        read -r -a fields <<< "$(head -n 1 saved_game.txt | tr '|' ' ')"
        is_x_turn=$(tail -n 1 saved_game.txt)
        echo "Game loaded successfully."
    else
        echo "No saved game found."
    fi
}

row=0
column=0
is_x_turn=1

while true; do
    display_board
    read -p "Enter '1' to make a move, '2' to save the game, '3' to load the game, or '0' to exit: " option
    case $option in
        1)
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
            ;;
        2)
            save_game
            ;;
        3)
            load_game
            ;;
        0)
            echo "Exiting the game."
            exit
            ;;
        *)
            echo "Invalid option. Please enter '1', '2', '3', or '0'."
            ;;
    esac

    has_game_ended
    game_ended_status=$?
    if [[ $game_ended_status -eq 1 ]]; then
        display_board
        echo "Player ${fields[$index]} has won!"
        break
    elif [[ $game_ended_status -eq 2 ]]; then
        display_board
        echo "It's a tie!"
        break
    fi
done