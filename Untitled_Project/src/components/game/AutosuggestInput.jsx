import React from 'react';
import Autosuggest from 'react-autosuggest';
import autosuggestStyles from './Autosuggest.module.css';
import styles from './Game.module.css';

export default function AutosuggestInput({ guess, setGuess, suggestions, fetchSuggestions, onSuggestionSelected }) {

  // Renders base input props
  const renderInputComponent = (inputProps) => (
    <input {...inputProps} className={styles.guess} placeholder="Enter song title" />
  );

  // Fetches suggestions based on user's input.
  const onSuggestionsFetchRequested = ({ value }) => {
    fetchSuggestions(value);
  };

  // Will clear the suggestions and reset placeholder.
  const onSuggestionsClearRequested = () => {
  };

  // base input props (stored here for easy use)
  const inputProps = {
    value: guess,
    onChange: (e) => setGuess(e.target.value),
    placeholder: 'Enter song title',
    className: styles.guess,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion.title} - {suggestion.artist}</div>}
      inputProps={inputProps}
      renderInputComponent={renderInputComponent}
      onSuggestionSelected={(event, { suggestion }) => {
        onSuggestionSelected(suggestion);
        onSuggestionsClearRequested();
      }}
      theme={{
        container: autosuggestStyles.container,
        suggestionsContainer: autosuggestStyles.suggestionsContainer,
        suggestion: autosuggestStyles.suggestion,
        suggestionHighlighted: autosuggestStyles.suggestionHighlighted,
      }}
    />
  );
}
