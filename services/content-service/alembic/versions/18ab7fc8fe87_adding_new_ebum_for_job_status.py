"""adding new ebum for job status

Revision ID: 18ab7fc8fe87
Revises: 64a286ca7a6b
Create Date: 2026-01-06 04:07:40.210646

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '18ab7fc8fe87'
down_revision: Union[str, Sequence[str], None] = '64a286ca7a6b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
