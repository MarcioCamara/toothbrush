<?php
    $file = 'docs/index.html';
    $newfile = 'docs/404.html';

    if (!copy($file, $newfile)) {
        echo "falha ao copiar $file...\n";
    } else {
        echo "$file copiado com sucesso!\n";
    }
?>
